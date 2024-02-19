/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'
import { verifyTokenService } from '../services'
import { authApi } from '../lib'

export const verifyUserIsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let authorization = req.headers.authorization

  if (!authorization) throw new AppError('Not authorized', 401)

  authorization = authorization.split(' ')[1]

  authApi.defaults.headers.authorization = `Bearer ${authorization}`

  const user = await verifyTokenService(authorization)

  req.user = user

  return next()
}
