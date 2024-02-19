import { z } from 'zod'

export const ClassYearCreateSchema = z.object({
  schools: z.object({ id: z.string().uuid() }).array(),
  classes: z.object({ id: z.string().uuid() }).array(),
  year_id: z.string().uuid(),
})
