import { Router } from 'express'
import {
  createClassYearController,
  deleteClassYearController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { ClassYearCreateSchema } from '../schemas'

export const classYearRouter = Router()

classYearRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassYearCreateSchema),
  createClassYearController,
)

classYearRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteClassYearController,
)
