import { z } from 'zod'
import {
  ClassSchoolStudentCreateSchema,
  ClassStudentCreateSchema,
} from '../schemas'

export type IClassStudentRequest = z.infer<typeof ClassStudentCreateSchema>

export type IClassSchoolStudentRequest = z.infer<
  typeof ClassSchoolStudentCreateSchema
>
