import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  role: z.string().min(1, 'El rol es obligatorio'),
  id: z.string()
});

const AdministratorSchema = UserSchema.extend({
  provider_id: z.string()
});

const RequiredRolesSchema = z.object({
  'front-end': z.number(),
  'back-end': z.number(),
  'full-stack': z.number(),
  designer: z.number(),
  any: z.number()
});

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria').max(300, 'La descripción es demasiado larga'),
  administrator: AdministratorSchema,
  members: z.array(UserSchema),
  repository_url: z.string().url().nullable(),
  required_roles: RequiredRolesSchema,
  status: z.enum(['OPEN', 'CLOSED', 'PENDING']),
  created_at: z.string()
});

export type ProjectDataType = z.infer<typeof ProjectSchema>;

const UpsertUserSchema = UserSchema.extend({
  id: z.string().uuid()
});

export const UpsertProjectSchema = ProjectSchema.extend({
  id: z.number().optional(),
  members: z.array(UpsertUserSchema).max(3, 'El número máximo de participantes es 4')
});

export type UpsertProjectType = z.infer<typeof UpsertProjectSchema>;
