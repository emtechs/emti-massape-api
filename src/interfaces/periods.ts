import { CategoryPeriod } from '@prisma/client'
import { z } from 'zod'
import {
  PeriodCreateSchema,
  PeriodUpdateSchema,
  YearCreateSchema,
} from '../schemas'
import { IQuery } from '../interfaces'

export type IYearRequest = z.infer<typeof YearCreateSchema>

export type IPeriodRequest = z.infer<typeof PeriodCreateSchema>

export type IPeriodUpdateRequest = z.infer<typeof PeriodUpdateSchema>

export interface IMonth {
  name: string
  month: number
}

export interface ICalendarQuery extends IQuery {
  month?: string
  category?: CategoryPeriod
}
