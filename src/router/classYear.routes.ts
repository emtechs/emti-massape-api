import { Router } from 'express'
import {
  createClassYearController,
  deleteClassYearController,
  listClassYearController,
  listSchoolClassYearController,
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

classYearRouter.get('', verifyUserIsAuthenticated, listClassYearController)

classYearRouter.get(
  '/schools',
  verifyUserIsAuthenticated,
  listSchoolClassYearController,
)

classYearRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteClassYearController,
)
