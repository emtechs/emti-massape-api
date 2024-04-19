import { z } from 'zod'

export const UserCreateSchema = z.object({
  login: z.string(),
  name: z.string(),
  password: z.string().optional(),
  cpf: z.string(),
  is_super: z.boolean().optional(),
  is_admin: z.boolean().optional(),
})

export const ServerCreateSchema = UserCreateSchema.extend({
  schools: z.object({ id: z.string().uuid() }).array(),
})

export const ServerConnectSchema = z.object({
  schools: z.object({ id: z.string().uuid() }).array(),
  server_id: z.string().uuid(),
})

export const UserReturnSchema = UserCreateSchema.extend({
  is_active: z.boolean(),
  created_at: z.date(),
})

export const UserUpdateRequestSchema = UserCreateSchema.extend({
  is_active: z.boolean().optional(),
}).partial()

export const UserArraySchema = UserReturnSchema.array()
