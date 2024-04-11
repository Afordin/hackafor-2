import { ForwardedRef, forwardRef, useState } from 'react';
import { HtmlType, Variant } from '@common';
import { Button, Counter, Tag } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootLayout } from '@layouts';
import { useUserStore } from '@store';
import { apiClient, UpsertProjectSchema, UpsertProjectType } from '@utils';
import { FieldError, useFieldArray, useForm } from 'react-hook-form';

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

  const [wantsRoles, setWantsRoles] = useState<boolean>(false);
  const [wantedRoles, setWantedRoles] = useState({
    'Front-end': 0,
    'Back-end': 0,
    'Full-stack': 0,
    'Diseñador(a)': 0,
    Otro: 0
  });

  const addWantedRole = (role: string) => {
    if (currentNumberOfMembers < 3) {
      setWantedRoles((prev) => ({ ...prev, [role]: prev[role] < 3 ? prev[role] + 1 : prev[role] }));
    }
  };

  const removeWantedRole = (role: string) => {
    setWantedRoles((prev) => ({ ...prev, [role]: prev[role] > 0 ? prev[role] - 1 : prev[role] }));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(UpsertProjectSchema),
    defaultValues: {
      ...project,
      administrator: {
        ...project.administrator,
        name: user?.user_metadata.name ?? '',
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

  const currentNumberOfMembers = Object.values(wantedRoles).reduce((acc, item) => acc + item, members.length);
  const rolesDisabled = currentNumberOfMembers >= 3;

  const handleSave = (values) => {
    createProject(values);
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <RootLayout>
      <article id="registration" className="w-full h-screen flex flex-col gap-y-[48px] justify-center text-cWhite">
        <p className="text-[32px] text-center">Lorem ipsum dolor sit amet consectetur.</p>
        <form className="flex flex-col w-full  max-w-6xl mx-auto gap-y-6" onSubmit={handleSubmit(handleSave, handleError)}>
          <FormField
            id="project-name"
            label="Título del proyecto*"
            placeholder="Introduce el título del proyecto"
            error={errors.name}
            {...register('name')}
          />

          <FormField
            id="project-description"
            label="Descripción del proyecto*"
            textArea={true}
            placeholder="Introduce una breve descripción del proyecto"
            error={errors.description}
            {...register('description')}
          />

          <fieldset className="flex flex-col gap-y-6 w-full">
            <div className="flex justify-center items-center gap-x-4 w-full">
              <p className="text-8 text-center text-regular">Introduce a los participantes</p>
              <Button
                variant={Variant.secondary}
                hasBorder
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
            <div className="grid grid-cols-2 items-center gap-x-4 w-full">
              <FormField
                id={`administrator-name`}
                label="Nombre del administrador*"
                placeholder="Nombre del administrador"
                error={errors[`administrator.name`]}
                {...register(`administrator.name`)}
              />
              <div className="w-full flex gap-y-2 flex-col justify-center">
                <p className="text-[20px] font-bold">Rol del participante*</p>
                <div className="flex gap-x-4 ">
                  <Tag>Front-end</Tag>
                  <Tag>Back-end</Tag>
                  <Tag>Full-Stack</Tag>
                  <Tag>Diseñador(a)</Tag>
                  <Tag>Otros</Tag>
                </div>
              </div>
            </div>

            {members.map((member, index) => (
              <fieldset key={member.id} className="grid grid-cols-2 items-center gap-x-4">
                {/* TODO: Change this style to red button */}
                <div className="flex gap-x-4 items-center">
                  <Button
                    onClick={() => {
                      removeMember(index);
                    }}
                    className="i-lucide-circle-minus mt-8 text-red-6"
                  >
                    Delete
                  </Button>
                  <FormField
                    id={`member-${index}-name`}
                    label="Nombre del miembro"
                    placeholder="Introduce el nombre de un miembro"
                    error={errors[`members.${index}`]}
                    {...register(`members.${index}.name`)}
                  />
                </div>

                <div className="w-full flex gap-y-2 flex-col justify-center">
                  <p className="text-[20px] font-bold">Rol del participante*</p>
                  <div className="flex gap-x-4 ">
                    <Tag>Front-end</Tag>
                    <Tag>Back-end</Tag>
                    <Tag>Full-Stack</Tag>
                    <Tag>Diseñador(a)</Tag>
                    <Tag>Otros</Tag>
                  </div>
                </div>
              </fieldset>
            ))}
          </fieldset>

          <label htmlFor="wanted-roles" className="flex gap-x-2">
            <input
              type="checkbox"
              id="wanted-roles"
              onChange={() => {
                setWantsRoles(!wantsRoles);
              }}
              className="text-cWhite"
            />
            <span className="font-bold text-[20px]"> Estoy buscando a otras personas para mi proyecto</span>
          </label>

          {wantsRoles && (
            <article className="flex gap-x-2 justify-between">
              {Object.entries(wantedRoles).map((wantedRole) => {
                return (
                  <Counter
                    key={wantedRole[0]}
                    role={wantedRole[0]}
                    amount={wantedRole[1]}
                    disabled={rolesDisabled}
                    increase={addWantedRole}
                    decrease={removeWantedRole}
                  />
                );
              })}
            </article>
          )}

          <div className="flex justify-center">
            <Button htmlType={HtmlType.submit} className="w-fit">
              Registrar proyecto
            </Button>
          </div>
        </form>
      </article>
    </RootLayout>
  );
};

type FormFieldProps = { label: string; error?: FieldError; textArea?: boolean } & React.ComponentProps<'input'>;

const FormField = forwardRef(({ label, error, textArea, ...props }: FormFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor={props.id} className="text-[20px] font-bold">
        {label}
      </label>
      {textArea ? (
        // TODO: Change to Textarea
        <input ref={ref} className="bg-transparent w-full border-1 border-pBorder rounded-3 p-4 text-[24px]" {...props} />
      ) : (
        <input ref={ref} className="bg-transparent w-full border-1 border-pBorder rounded-3 p-4 text-[24px]" {...props} />
      )}

      {error && <p aria-live="assertive">{error.message}</p>}
    </div>
  );
});
