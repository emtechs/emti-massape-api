import { z } from 'zod'

export const UserCreateSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['SERV', 'DIRET', 'ADMIN']).optional(),
})

export const UserReturnSchema = UserCreateSchema.extend({
  is_active: z.boolean(),
  created_at: z.date(),
})

export const UserUpdateRequestSchema = UserCreateSchema.extend({
  is_active: z.boolean().optional(),
})
  .partial()
  .omit({ id: true })

export const UserArraySchema = UserReturnSchema.array()
