import { ForwardedRef, forwardRef } from 'react';
import { HtmlType } from '@common';
import { Button } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootLayout } from '@layouts';
import { useUserStore } from '@store';
import { apiClient, UpsertProjectSchema, UpsertProjectType } from '@utils';
import { FieldError, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      <article id="registration" className="w-full h-screen flex flex-col gap-y-[48px] items-center justify-center text-cWhite">
        <p className="text-[32px]">Lorem ipsum dolor sit amet consectetur.</p>
        <form className="flex flex-col w-full max-w-6xl mx-auto gap-y-6" onSubmit={handleSubmit(handleSave, handleError)}>
          <FormField
            id="project-name"
            label={`${t('registration_first_input_title')}*`}
            placeholder={t('registration_first_input_placeholder')}
            error={errors.name}
            {...register('name')}
          />

          <FormField
            id="project-description"
            label={`${t('registration_second_input_title')}*`}
            textArea={true}
            placeholder={t('registration_second_input_placeholder')}
            error={errors.description}
            {...register('description')}
          />

          <fieldset className="flex flex-col gap-y-4">
            <legend className="text-2xl">{t('registration_third_input_title')}</legend>

            <fieldset className="flex items-center gap-x-4">
              <legend>{t('common_admin')}</legend>

              <FormField
                id={`administrator-name`}
                label={t('registration_participant_section_admin_name')}
                error={errors[`administrator.name`]}
                {...register(`administrator.name`)}
              />

              <FormField
                id={`administrator-role`}
                label={t('registration_participant_section_admin_role')}
                error={errors[`administrator.role`]}
                {...register(`administrator.role`)}
              />
            </fieldset>

            {members.map((member, index) => (
              <fieldset key={member.id} className="flex items-center gap-x-4">
                <legend>
                  {t('registration_participant_section_count_member', {
                    count: index
                  })}
                </legend>

                <FormField
                  id={`member-${index}-name`}
                  label={t('registration_participant_section_participant_name')}
                  error={errors[`members.${index}`]}
                  {...register(`members.${index}.name`)}
                />

                <FormField
                  id={`member-${index}-role`}
                  label={t('registration_participant_section_participant_name')}
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
              {t('registration_first_button')}
            </Button>
          </fieldset>

          <Button htmlType={HtmlType.submit}>{t('registration_second_button')}</Button>
        </form>
      </article>
    </RootLayout>
  );
};

type FormFieldProps = { label: string; error?: FieldError; textArea?: boolean } & React.ComponentProps<'input'>;

const FormField = forwardRef(({ label, error, textArea, ...props }: FormFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={props.id} className="text-[20px] font-bold">
        {label}
      </label>
      {textArea ? (
        // TODO: Change to Textarea
        <input ref={ref} className="bg-transparent border-1 border-pBorder rounded-3 p-4 text-[24px]" {...props} />
      ) : (
        <input ref={ref} className="bg-transparent border-1 border-pBorder rounded-3 p-4 text-[24px]" {...props} />
      )}

      {error && <p aria-live="assertive">{error.message}</p>}
    </div>
  );
});
