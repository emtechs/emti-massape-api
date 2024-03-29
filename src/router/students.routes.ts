import { Router } from 'express'
import {
  createStudentController,
  listStudentController,
  resumeStudentController,
  retrieveStudentController,
  updateStudentController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { StudentCreateSchema, StudentUpdateSchema } from '../schemas'

export const studentRouter = Router()

studentRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StudentCreateSchema),
  createStudentController,
)

studentRouter.get('', verifyUserIsAuthenticated, listStudentController)

studentRouter.get(
  '/resume/:year_id',
  verifyUserIsAuthenticated,
  resumeStudentController,
)

studentRouter.get('/:id', verifyUserIsAuthenticated, retrieveStudentController)

studentRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StudentUpdateSchema),
  updateStudentController,
)
