import { z } from 'zod'

export const ClassYearCreateSchema = z.object({
  year: z.string(),
  class_id: z.string().uuid(),
  school_id: z.string().uuid(),
})

export const ClassYearRetrieveManySchema = z.object({
  classes: z.object({ key: z.string().uuid() }).array(),
})
