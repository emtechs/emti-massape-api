import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'
import { verifyIsSuper } from './isSuper'

export const verifyIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.is_admin) return next()

  verifyIsSuper(req, res, next)

  throw new AppError('Missing permissions', 401)
}
