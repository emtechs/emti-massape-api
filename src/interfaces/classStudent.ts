import { z } from 'zod'
import { ClassStudentCreateSchema } from '../schemas'

export type IClassStudentRequest = z.infer<typeof ClassStudentCreateSchema>
