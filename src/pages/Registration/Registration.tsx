// import { useEffect } from 'react';

import { HtmlType, VARIANT } from '@common';
import { Button } from '@components';
import { createClient } from '@supabase/supabase-js';
import { SubmitHandler, useForm } from 'react-hook-form';

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_API_KEY);

const postProject = (project) => {
  return supabase.from('Project').insert(project);
};
// const defaultProject = {
//   name: 'default name',
//   description: 'default description',
//   members: [],
//   administrator: { name: 'zyruks', role: 'front-end', provider_id: 12345 },
//   required_roles: { 'front-end': 0, 'back-end': 0, 'full-stack': 0, designer: 0, any: 0 },
//   status: 'PENDING'
// };

type InputsProject = {
  title: string;
  description: string;
};
export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InputsProject>();
  const onSubmit: SubmitHandler<InputsProject> = ({ title, description }) => {
    const newProject = {
      name: title,
      description,
      members: [],
      administrator: {},
      required_roles: {},
      status: 'PENDING'
    };
    postProject(newProject).then((result) => console.log(result));
  };

  return (
    <article id="registration" className=" w-full h-screen text-white flex flex-colum items-center justify-center ">
      <form onSubmit={handleSubmit(onSubmit)} className=" w-10/12">
        <div className="mb-5 w">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Titulo del proyecto*
          </label>
          <input
            type="text"
            placeholder="Introduce el título del proyecto"
            {...register('title', { required: true })}
            className="border border-cBorder text-sm text-cField rounded-lg  block w-full p-2.5 bg-transparent"
          />
          {errors.title && <span className="text-secondary-400">El campo titulo del proyecto es requerido</span>}
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium">
            Decripción del proyecto*
          </label>
          <input
            type="text"
            placeholder="Indroduce una breve descripción del proyecto"
            {...register('description', { required: true })}
            className="border border-cBorder text-sm text-cField rounded-lg  block w-full p-2.5 bg-transparent"
          />
          {errors.title && <span className="text-secondary-400">El campo description del proyecto es requerido</span>}
        </div>

        <Button variant={VARIANT.PRIMARY} htmlType={HtmlType.submit} className="mt-6">
          {' '}
          Registar proyecto{' '}
        </Button>
      </form>
    </article>
  );
};
