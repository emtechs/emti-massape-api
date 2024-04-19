import { z } from 'zod'

export const ClassStudentCreateSchema = z.object({
  year: z.string(),
  class_id: z.string().uuid(),
  student_id: z.string().uuid(),
})
