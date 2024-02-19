import { z } from 'zod'
import { UserCreateSchema } from './user.schema'

export const SchoolServerCreateSchema = UserCreateSchema.extend({
  schools: z.object({ id: z.string().uuid() }).array(),
})
