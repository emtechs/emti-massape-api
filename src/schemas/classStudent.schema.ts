import { z } from 'zod'

export const ClassStudentCreateSchema = z.object({
  students: z.object({ id: z.string().uuid() }).array(),
  class_id: z.string().uuid(),
})

export const ClassSchoolStudentCreateSchema = z.object({
  students: z.object({ id: z.string().uuid() }).array(),
  class_id: z.string().uuid(),
  year_id: z.string().uuid(),
  school_id: z.string().uuid(),
})
