import { useState } from 'react';
import { ButtonSize, cn, FormFieldState, HtmlType, ProjectRoles, RequiredRoles, Role, Variant } from '@common';
import { Button, Counter, Textarea, TextInput } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootLayout } from '@layouts';
import { useUserStore } from '@store';
import { apiClient, UpsertProjectSchema, UpsertProjectType } from '@utils';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RoleSelector } from './components';
import { addWantedRole, removeWantedRole } from './utils';

const createProject = (project: UpsertProjectType) => {
  return apiClient.from('Project').insert(project);
};

// const updateProject = (project: UpsertProjectType) => {
//   return apiClient.from('Project').update(project).eq('id', project.id);
// };

type RoleFormNames = `required_roles.${Role}`;

const DEFAULT_PROJECT = {
  name: '',
  description: '',
  repository_url: null,
  administrator: {
    name: '',
    role: '',
    provider_id: '',
    id: ''
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
  created_at: undefined
} as const satisfies UpsertProjectType;

export const Registration = ({ project = DEFAULT_PROJECT }: { project?: UpsertProjectType }) => {
  const { user } = useUserStore();
  const roles = Object.values(ProjectRoles);
  const [submitError, setSubmitError] = useState('');
  const [wantsRoles, setWantsRoles] = useState<boolean>(false);
  const [wantedRoles, setWantedRoles] = useState<RequiredRoles>(DEFAULT_PROJECT.required_roles);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
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

  const onSubmit = async (values: UpsertProjectType) => {
    try {
      await createProject(values);
      reset(DEFAULT_PROJECT);
      toast.success('¡Enhorabuena! Acabas de registrar el proyecto');
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
      <div key={member.id} className="grid lg:grid-cols-2 gap-4 mt-10 animate-fade-in-down animate-duration-200">
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
                className="w-full lg:max-w-md"
                onChange={onChange}
                assistiveText={error && error.message}
                fieldState={error ? FormFieldState.error : FormFieldState.default}
              />
            )}
          />
        </div>

        <div className="flex gap-2 flex-col justify-center">
          <p className="text-md font-bold">Rol del participante*</p>
          <div className="flex gap-4">
            <Controller
              control={control}
              name={`members.${index}.role`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <RoleSelector
                  roles={roles}
                  selectedRole={value}
                  onRoleChange={(role: Role) => onChange(role)}
                  assistiveText={error && error.message}
                  fieldState={error ? FormFieldState.error : FormFieldState.default}
                />
              )}
            />
          </div>
        </div>
      </div>
    ));

  const renderWantsRoles = () =>
    Object.entries(wantedRoles).map(([roleKey, amount]) => {
      const fieldName = `required_roles.${roleKey}` as RoleFormNames;
      return (
        <Controller
          name={fieldName}
          control={control}
          key={roleKey}
          render={({ field: { onChange } }) => (
            <Counter
              role={roleKey}
              onChange={(role: Role) => onChange(role)}
              amount={amount}
              disabled={isRegistrationFull}
              increase={() => addWantedRole(roleKey, currentNumberOfMembers, setWantedRoles)}
              decrease={() => removeWantedRole(roleKey, setWantedRoles)}
            />
          )}
        />
      );
    });

  return (
    <RootLayout>
      <main id="registration" className="pt-32 text-cWhite">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl text-center mb-10">Registra tu proyecto</h1>

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
                  isDisabled={isRegistrationFull}
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

              <div className="grid lg:grid-cols-2 place-items-center gap-4 mt-10">
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

                <div className="w-full flex gap-y-2 flex-col">
                  <p className="text-md font-bold">Rol del participante*</p>
                  <Controller
                    name="administrator.role"
                    control={control}
                    render={({ field }) => (
                      <RoleSelector
                        roles={roles}
                        selectedRole={field.value}
                        onRoleChange={(role: Role) => field.onChange(role)}
                        assistiveText={errors.administrator?.role?.message}
                        fieldState={errors.administrator ? FormFieldState.error : FormFieldState.default}
                      />
                    )}
                  />
                </div>
              </div>
            </fieldset>

            {/* MEMBERS SECTION */}
            <fieldset className="grid gap-10 my-8">{renderMembers()}</fieldset>

            {/* WANTED ROLES */}
            <fieldset>
              <label htmlFor="wanted-roles" className="flex gap-x-2">
                <input
                  type="checkbox"
                  id="wanted-roles"
                  onChange={() => {
                    setWantsRoles(!wantsRoles);
                    if (wantsRoles) setWantedRoles(DEFAULT_PROJECT.required_roles);

                    // NOTE: Reset required_roles to default
                    setValue('required_roles', DEFAULT_PROJECT.required_roles, { shouldDirty: true, shouldTouch: true });
                  }}
                  className="text-cWhite"
                  disabled={!wantsRoles && isRegistrationFull}
                />
                <span className={cn('font-bold text-xl transition-colors', { 'text-neutral-400': !wantsRoles && isRegistrationFull })}>
                  Estoy buscando a otras personas para mi proyecto
                </span>
              </label>

              {wantsRoles && (
                <article className="flex gap-8 justify-evenly my-4 flex-wrap animate-fade-in-down animate-duration-300">
                  {renderWantsRoles()}
                </article>
              )}
            </fieldset>

            <div className="flex justify-center w-full my-16">
              {submitError && <div className="text-red-500 text-center my-4">{submitError}</div>}
              <Button htmlType={HtmlType.submit} className="w-fit h-[56px] px-10 text-lg">
                Registrar proyecto
              </Button>
            </div>
          </form>
        </div>
      </main>
    </RootLayout>
  );
};
