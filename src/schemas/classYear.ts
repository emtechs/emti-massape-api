import { z } from 'zod'

export const ClassYearCreateSchema = z.object({
  year: z.string(),
  class_id: z.string().uuid(),
  school_id: z.string().uuid(),
})
