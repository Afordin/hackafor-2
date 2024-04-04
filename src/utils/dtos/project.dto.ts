import { Project, ProjectStatus } from '@common';
import { ProjectDataType } from '@utils';

/**
 * Converts a project status from uppercase to lowercase enum value.
 * @param status The status string in uppercase.
 * @returns The corresponding enum value in lowercase.
 */
const convertStatus = (status: string): ProjectStatus => {
  const statusMap = {
    OPEN: ProjectStatus.open,
    CLOSED: ProjectStatus.closed,
    PENDING: ProjectStatus.pending
  };

  return statusMap[status] || ProjectStatus.pending;
};

/**
 * Formats a raw project object to match the Project type.
 * @param rawProject The project data directly from Supabase.
 * @returns A formatted project object.
 */
export const projectDTO = (rawProject: ProjectDataType): Project => {
  return {
    administrator: rawProject.administrator,
    createdAt: rawProject.created_at,
    description: rawProject.description,
    id: rawProject.id,
    members: rawProject.members,
    name: rawProject.name,
    repositoryUrl: rawProject.repository_url,
    requiredRoles: rawProject.required_roles,
    status: convertStatus(rawProject.status)
  };
};
