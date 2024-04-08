import { Project } from '@common';
import { apiClient, projectDTO } from '@utils';

export const getProjects = async (): Promise<Project[]> => {
  const { data: projectsData, error } = await apiClient.from('Project').select();

  if (error) {
    throw new Error(error.message);
  }

  if (!projectsData) {
    throw new Error('No projects found.');
  }

  const projects = projectsData.map((projectData) => projectDTO(projectData));

  return projects;
};
