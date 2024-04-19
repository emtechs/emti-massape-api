import { Router } from 'express'
import {
  createClassStudentController,
  deleteClassStudentController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { ClassStudentCreateSchema } from '../schemas'

export const classStudentRouter = Router()

classStudentRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassStudentCreateSchema),
  createClassStudentController,
)

classStudentRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteClassStudentController,
)
