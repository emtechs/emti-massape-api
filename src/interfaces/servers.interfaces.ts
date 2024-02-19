import { z } from 'zod'
import { SchoolServerCreateSchema } from '../schemas'

export type ISchoolServerRequest = z.infer<typeof SchoolServerCreateSchema>
