import { z } from 'zod'

export const ClassYearStudentCreateSchema = z.object({
  class_id: z.string().uuid(),
  student_id: z.string().uuid(),
})
