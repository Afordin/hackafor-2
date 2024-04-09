import { ForwardedRef, forwardRef } from 'react';
import { HtmlType } from '@common';
import { Button } from '@components';
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

  const handleSave = (values) => {
    createProject(values);
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <RootLayout>
      <article id="registration" className="w-full h-screen flex items-center justify-center text-cWhite">
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(handleSave, handleError)}>
          <FormField id="project-name" label="Project Name" error={errors.name} {...register('name')} />

          <FormField id="project-description" label="Project Description" error={errors.description} {...register('description')} />

          <fieldset className="flex flex-col gap-y-4">
            <legend className="text-2xl">Introduce a los participantes</legend>

            <fieldset className="flex items-center gap-x-4">
              <legend>Administrador</legend>

              <FormField
                id={`administrator-name`}
                label="Administrator Name"
                error={errors[`administrator.name`]}
                {...register(`administrator.name`)}
              />

              <FormField
                id={`administrator-role`}
                label="Administrator Role"
                error={errors[`administrator.role`]}
                {...register(`administrator.role`)}
              />
            </fieldset>

            {members.map((member, index) => (
              <fieldset key={member.id} className="flex items-center gap-x-4">
                <legend>Member {index}</legend>

                <FormField
                  id={`member-${index}-name`}
                  label="Participant Name"
                  error={errors[`members.${index}`]}
                  {...register(`members.${index}.name`)}
                />

                <FormField
                  id={`member-${index}-role`}
                  label="Participant Role"
                  error={errors[`members.${index}`]}
                  {...register(`members.${index}.role`)}
                />

                <Button
                  onClick={() => {
                    removeMember(index);
                  }}
                >
                  &times;
                </Button>
              </fieldset>
            ))}

            <Button
              onClick={() => {
                appendMember({
                  id: crypto.randomUUID(),
                  name: '',
                  role: ''
                });
              }}
            >
              Añadir miembro
            </Button>
          </fieldset>

          <Button htmlType={HtmlType.submit}>Añadir proyecto</Button>
        </form>
      </article>
    </RootLayout>
  );
};

type FormFieldProps = { label: string; error?: FieldError } & React.ComponentProps<'input'>;

const FormField = forwardRef(({ label, error, ...props }: FormFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-y-4">
      <label htmlFor={props.id}>{label}</label>
      <input ref={ref} className="text-cBlack" {...props} />
      {error && <p aria-live="assertive">{error.message}</p>}
    </div>
  );
});
