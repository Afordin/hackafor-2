import { Project } from '@common';

/**
 * Filters project by given roles.
 * @param {Array} projects - The projects to filter.
 * @param {Array} roles - The role to filter bby.
 * @param {array} - The filtered projects
 */
export const filterBy = (projects: Project[], roles: string[]) => {
  if (roles.length === 0) return projects;
  return projects.filter((project) => roles?.some((role) => project.requiredRoles[role] > 0));
};
