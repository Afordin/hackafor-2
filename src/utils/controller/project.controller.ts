import { Project } from '@common';
import { projectDTO, supabase } from '@utils';

export const getProjects = async (): Promise<Project[]> => {
  const { data: projectsData, error } = await supabase.from('Project').select();

  if (error) {
    throw new Error(error.message);
  }

  if (!projectsData) {
    throw new Error('No projects found.');
  }

  const projects = projectsData.map((projectData) => projectDTO(projectData));

  return projects;
};
