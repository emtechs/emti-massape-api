import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'
import { prisma } from '../lib'
import { verifyIsAdmin } from './isAdmin'

export const verifyIsPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const server = await prisma.schoolServer.findFirst({
    where: {
      school_id: req.params.school_id,
      server_id: req.user.id,
    },
  })

  if (server) return next()

  verifyIsAdmin(req, res, next)

  throw new AppError('Missing permissions', 401)
}
