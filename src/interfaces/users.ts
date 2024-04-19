import { z } from 'zod'
import {
  UserCreateSchema,
  UserReturnSchema,
  UserUpdateRequestSchema,
} from '../schemas'
import { IQuery } from '../interfaces'

export interface IRequestUser {
  id: string
  is_super: boolean
  is_admin: boolean
}

export interface IUser {
  id: string
  name: string
  login: string
  is_super: boolean
}

export type IUserReturn = z.infer<typeof UserReturnSchema>

export type IUserRequest = z.infer<typeof UserCreateSchema>

export type IUserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>

export interface IUserQuery extends IQuery {
  isNot_director_school?: 'true' | 'false'
  allNotServ?: 'true' | 'false'
  director?: 'true' | 'false'
  name?: string
  is_server?: 'true' | 'false'
  is_admin?: 'true' | 'false'
}
