export enum ProjectStatus {
  open = 'open',
  closed = 'closed',
  pending = 'pending'
}

export type User = {
  name: string;
  role: string;
};

export enum ProjectRoles {
  frontEnd = 'front-end',
  backEnd = 'back-end',
  fullStack = 'full-stack',
  designer = 'designer',
  any = 'any'
}

export type RequiredRoles = {
  'front-end': number;
  'back-end': number;
  'full-stack': number;
  designer: number;
  any: number;
};

export type Project = {
  administrator: User;
  createdAt: string;
  description: string;
  id: number;
  members: User[];
  name: string;
  repositoryUrl: string | null;
  requiredRoles: RequiredRoles;
  status: ProjectStatus;
};
