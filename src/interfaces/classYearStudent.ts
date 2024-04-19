import { z } from 'zod'
import { ClassYearStudentCreateSchema } from '../schemas'

export type IClassYearStudentRequest = z.infer<
  typeof ClassYearStudentCreateSchema
>
