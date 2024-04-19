import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'
import { authApi, emtiApi } from '../lib'
import { retrieveUserService, verifyUserService } from '../services'

export const verifyUserIsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let authorization = req.headers.authorization

  if (!authorization) throw new AppError('Not authorized', 401)

  authorization = authorization.split(' ')[1]

  authApi.defaults.headers.authorization = `Bearer ${authorization}`
  emtiApi.defaults.headers.authorization = `Bearer ${authorization}`

  const { data } = await authApi.get<string>('token')

  const [user] = await Promise.all([
    retrieveUserService(data),
    verifyUserService(data),
  ])

  req.user = user

  return next()
}
