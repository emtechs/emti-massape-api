import { CategoryPeriod } from '@prisma/client'
import { z } from 'zod'
import {
  SchoolClassCreateSchema,
  SchoolCreateSchema,
  SchoolReportSchema,
  SchoolReturnSchema,
  SchoolUpdateSchema,
} from '../schemas'
import { IQuery } from '../interfaces'

export type ISchoolRequest = z.infer<typeof SchoolCreateSchema>

export type ISchoolReportRequest = z.infer<typeof SchoolReportSchema>

export type ISchoolData = z.infer<typeof SchoolReturnSchema>

export type ISchoolClassRequest = z.infer<typeof SchoolClassCreateSchema>

export type ISchoolUpdateRequest = z.infer<typeof SchoolUpdateSchema>

export interface ISchool {
  name: string
  director_id: string
}

export interface ISchoolUpdate {
  id?: string
}

export interface ISchoolUpdateInfrequency {
  school_id: string
  periods: { period_id: string }[]
}

export interface ISchoolQuery extends IQuery {
  infreq?: number
  name?: string
  director_id?: string
  server_id?: string
  none_server_id?: string
  category?: CategoryPeriod
  view?: 'server' | 'class' | 'student'
}
