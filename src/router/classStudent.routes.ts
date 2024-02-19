import { Router } from 'express'
import {
  createClassSchoolStudentController,
  createClassStudentController,
  deleteClassStudentController,
  listClassStudentController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  ClassSchoolStudentCreateSchema,
  ClassStudentCreateSchema,
} from '../schemas'

export const classStudentRouter = Router()

classStudentRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassStudentCreateSchema),
  createClassStudentController,
)

classStudentRouter.post(
  '/school',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassSchoolStudentCreateSchema),
  createClassSchoolStudentController,
)

classStudentRouter.get(
  '',
  verifyUserIsAuthenticated,
  listClassStudentController,
)

classStudentRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteClassStudentController,
)
