import { z } from 'zod'
import { ClassYearCreateSchema, ClassYearRetrieveManySchema } from '../schemas'

export type IClassYearRequest = z.infer<typeof ClassYearCreateSchema>

export type IClassYearRetrieveManyRequest = z.infer<
  typeof ClassYearRetrieveManySchema
>
