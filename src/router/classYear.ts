import { Router } from 'express'
import {
  createClassYearController,
  deleteClassYearController,
  retrieveManyClassYearController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { ClassYearCreateSchema, ClassYearRetrieveManySchema } from '../schemas'

export const classYearRouter = Router()

classYearRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassYearCreateSchema),
  createClassYearController,
)

classYearRouter.post(
  '/many',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassYearRetrieveManySchema),
  retrieveManyClassYearController,
)

classYearRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteClassYearController,
)
