import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  role: z.string()
});

const RequiredRolesSchema = z.object({
  'front-end': z.number(),
  'back-end': z.number(),
  'full-stack': z.number(),
  designer: z.number(),
  any: z.number()
});

export const ProjectSchema = z.object({
  administrator: UserSchema,
  created_at: z.string(),
  description: z.string(),
  id: z.number(),
  members: z.array(UserSchema),
  name: z.string(),
  repository_url: z.string().nullable(),
  required_roles: RequiredRolesSchema,
  status: z.enum(['OPEN', 'CLOSED', 'PENDING'])
});

export type ProjectDataType = z.infer<typeof ProjectSchema>;
