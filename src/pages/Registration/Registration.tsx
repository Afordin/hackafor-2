// import { useEffect } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_API_KEY);

// const fetchProjects = () => {
//   return supabase.from('Project').select();
// };

// const createProject = (project: any) => {
//   return supabase.from('Project').insert(project);
// };

// const updateProject = (project: any) => {
//   return supabase.from('Project').update(project).eq('id', project.id);
// };

// const defaultProject = {
//   name: 'default name',
//   description: 'default description',
//   members: [],
//   administrator: { name: 'zyruks', role: 'front-end', provider_id: 12345 },
//   required_roles: { 'front-end': 0, 'back-end': 0, 'full-stack': 0, designer: 0, any: 0 },
//   status: 'PENDING'
// };

export const Registration = () => {
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   fetchProjects().then((data) => {
  //     console.log(data);
  //     // setProjects(data.data);
  //   });
  // }, []);

  return <h1>Hola</h1>;
  //     <article id="registration" className="w-full h-screen flex items-center justify-center">
  //       {/* <form
  //         onSubmit={(event) => {
  //           event.preventDefault();
  //           createProject(defaultProject).then((data) => console.log(data));
  //         }}
  //       >
  //         <Button htmlType={HtmlType.submit}>Añadir proyecto</Button>
  //       </form> */}
  //       <div className="text-white flex flex-col">
  //         {/* {projects.map((project) => (
  //           <form
  //             onSubmit={(event) => {
  //               event.preventDefault();
  //               updateProject({ ...project, members: [...project.members, { name: 'marcos', role: 'back-end' }] })
  //                 .then((data) => console.log(data))
  //                 .catch((error) => console.error(error));
  //             }}
  //           >
  //             <div>{project.name}</div>
  //             <div>{project.description}</div>
  //             <Button htmlType={HtmlType.submit}>Update Project</Button>
  //           </form>
  //         ))} */}
  //       </div>
  //     </article>
  //   );
};
