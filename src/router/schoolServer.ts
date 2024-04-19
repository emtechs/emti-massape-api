import { Router } from 'express'
import { deleteSchoolServerController } from '../controllers'
import { verifyIsAdmin, verifyUserIsAuthenticated } from '../middlewares'

export const schoolServerRouter = Router()

schoolServerRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteSchoolServerController,
)
