import { useState } from 'react';
import { ButtonSize, cn, FormFieldState, HtmlType, Variant } from '@common';
import { Button, Counter, Textarea, TextInput } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootLayout } from '@layouts';
import { useUserStore } from '@store';
import { apiClient, UpsertProjectSchema, UpsertProjectType } from '@utils';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { RoleSelector } from './components';
import { addWantedRole, removeWantedRole, RoleState } from './utils';

const createProject = (project: UpsertProjectType) => {
  return apiClient.from('Project').insert(project);
};

// const updateProject = (project: UpsertProjectType) => {
//   return apiClient.from('Project').update(project).eq('id', project.id);
// };

const DEFAULT_PROJECT = {
  name: '',
  description: '',
  repository_url: null,
  administrator: {
    name: '',
    role: '',
    provider_id: ''
  },
  members: [],
  required_roles: {
    'front-end': 0,
    'back-end': 0,
    'full-stack': 0,
    designer: 0,
    any: 0
  },
  status: 'PENDING',
  created_at: ''
} as const satisfies UpsertProjectType;

export const Registration = ({ project = DEFAULT_PROJECT }: { project?: UpsertProjectType }) => {
  const { user } = useUserStore();
  const [submitError, setSubmitError] = useState('');
  const [wantsRoles, setWantsRoles] = useState<boolean>(false);
  const [wantedRoles, setWantedRoles] = useState<RoleState>({
    'Front-end': 0,
    'Back-end': 0,
    'Full-stack': 0,
    'Diseñador(a)': 0,
    Otro: 0
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<UpsertProjectType>({
    resolver: zodResolver(UpsertProjectSchema),
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      ...project,
      administrator: {
        ...project.administrator,
        name: user?.user_metadata.name ?? '',
        role: user?.user_metadata.role ?? '',
        provider_id: user?.user_metadata.provider_id ?? ''
      }
    }
  });

  const {
    fields: members,
    append: appendMember,
    remove: removeMember
  } = useFieldArray({
    name: 'members',
    control
  });

  const currentNumberOfMembers = Object.values(wantedRoles).reduce<number>((acc, item) => acc + item, members.length);
  const isRegistrationFull = currentNumberOfMembers >= 3;

  const onSubmit = async (values) => {
    try {
      await createProject(values);
      setSubmitError('');
    } catch (error) {
      console.error(error);
      setSubmitError('Por favor, verifique los campos');
    }
  };

  const handleError = (errors) => {
    setSubmitError('Por favor, verifique los campos');
    console.error(errors);
  };

  const renderMembers = () =>
    members.map((member, index) => (
      <div key={member.id} className="grid grid-cols-2 items-center gap-4 animate-fade-in-down animate-duration-200">
        <div className="flex gap-4 items-center gap-4">
          <Button
            onClick={() => {
              removeMember(index);
            }}
            className="i-lucide-circle-minus mt-6 bg-red-600 hover:bg-red-900 transition-colors"
            size={ButtonSize.sm}
          >
            <span className="invisible opacity-0">Delete</span>
          </Button>
          <Controller
            control={control}
            name={`members.${index}.name`}
            render={({ field: { name, value, onChange }, fieldState: { error } }) => (
              <TextInput
                label="Nombre del miembro*"
                name={name}
                value={value}
                className="w-full max-w-md"
                onChange={onChange}
                assistiveText={error ? error.message : ''}
                fieldState={error ? FormFieldState.error : FormFieldState.default}
              />
            )}
          />
        </div>

        <div className="flex gap-y-2 flex-col justify-center">
          <p className="text-md font-bold">Rol del participante*</p>
          <div className="flex gap-x-4 ">
            <Controller
              control={control}
              name={`members.${index}.role`}
              render={({ field, fieldState: { error } }) => (
                <RoleSelector
                  roles={['Front-end', 'Back-end', 'Full-Stack', 'Diseñador(a)', 'Otros']}
                  selectedRole={field.value}
                  onRoleChange={(role) => field.onChange(role)}
                  assistiveText={error ? error.message : ''}
                  fieldState={error ? FormFieldState.error : FormFieldState.default}
                />
              )}
            />
          </div>
        </div>
      </div>
    ));

  return (
    <RootLayout>
      <main id="registration" className="pt-32 text-cWhite">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl text-center mb-10">Lorem ipsum dolor sit amet consectetur.</h1>

          <form onSubmit={handleSubmit(onSubmit, handleError)}>
            {/* PROJECT INFO SECTION */}
            <fieldset className="grid gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <TextInput
                    label="Título del proyecto"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Introduce el título del proyecto"
                    assistiveText={errors.name?.message}
                    fieldState={errors.name ? FormFieldState.error : FormFieldState.default}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Textarea
                    label="Descripción del proyecto"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Introduce una breve descripción del proyecto"
                    assistiveText={errors.description?.message}
                    fieldState={errors.description ? FormFieldState.error : FormFieldState.default}
                  />
                )}
              />
            </fieldset>

            {/* PROJECT MEMBERS SECTION */}
            <fieldset className="w-full mt-10">
              <div className="w-full flex items-center justify-center gap-4 flex-wrap">
                <legend className="text-3xl text-center">Introduce a los participantes</legend>
                <Button
                  variant={Variant.secondary}
                  hasBorder
                  className="mt-2"
                  onClick={() => {
                    appendMember({
                      id: crypto.randomUUID(),
                      name: '',
                      role: ''
                    });
                  }}
                >
                  Añadir Miembro
                </Button>
              </div>

              <div className="flex items-center gap-4 mt-10 flex-col">
                <Controller
                  name="administrator.name"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <TextInput
                      label="Nombre del administrador*"
                      name={name}
                      isFullWidth
                      value={value}
                      onChange={onChange}
                      placeholder="Nombre del administrador"
                      assistiveText={errors.administrator?.name?.message}
                      fieldState={errors.administrator ? FormFieldState.error : FormFieldState.default}
                    />
                  )}
                />

                <div className="w-full flex gap-y-2 flex-col justify-center">
                  <p className="text-md font-bold">Rol del participante*</p>
                  <Controller
                    name="administrator.role"
                    control={control}
                    render={({ field }) => (
                      <RoleSelector
                        roles={['Front-end', 'Back-end', 'Full-Stack', 'Diseñador(a)', 'Otros']}
                        selectedRole={field.value}
                        onRoleChange={(role) => field.onChange(role)}
                        assistiveText={errors.administrator?.role?.message}
                        fieldState={errors.administrator ? FormFieldState.error : FormFieldState.default}
                      />
                    )}
                  />
                </div>
              </div>
            </fieldset>

            {/* MEMBERS SECTION */}
            <fieldset className="grid gap-6 my-8">{renderMembers()}</fieldset>

            {/* WANTED ROLES */}
            <fieldset>
              <label htmlFor="wanted-roles" className="flex gap-x-2">
                <input
                  type="checkbox"
                  id="wanted-roles"
                  onChange={() => {
                    setWantsRoles(!wantsRoles);
                  }}
                  className="text-cWhite"
                  disabled={isRegistrationFull}
                />
                <span className={cn('font-bold text-xl', { 'text-neutral-700': isRegistrationFull })}>
                  Estoy buscando a otras personas para mi proyecto
                </span>
              </label>

              {wantsRoles && (
                <article className="flex gap-x-2 justify-between my-4 animate-fade-in-down animate-duration-300">
                  {Object.entries(wantedRoles).map((wantedRole) => {
                    return (
                      <Counter
                        key={wantedRole[0]}
                        role={wantedRole[0]}
                        amount={wantedRole[1]}
                        disabled={isRegistrationFull}
                        increase={() => addWantedRole(wantedRole[0], currentNumberOfMembers, setWantedRoles)}
                        decrease={() => removeWantedRole(wantedRole[0], setWantedRoles)}
                      />
                    );
                  })}
                </article>
              )}
            </fieldset>

            <div className="my-16">
              {submitError && <div className="text-red-500 text-center my-4">{submitError}</div>}
              <Button htmlType={HtmlType.submit} className="w-full mx-auto ">
                Registrar proyecto
              </Button>
            </div>
          </form>
        </div>
      </main>
    </RootLayout>
  );
};
