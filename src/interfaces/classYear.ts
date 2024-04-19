import { z } from 'zod'
import { ClassYearCreateSchema } from '../schemas'

export type IClassYearRequest = z.infer<typeof ClassYearCreateSchema>
