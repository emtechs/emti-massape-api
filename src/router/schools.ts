import { Router } from 'express'
import {
  createSchoolController,
  deleteSchoolController,
  listSchoolController,
  retrieveSchoolController,
  updateSchoolController,
  verifySchoolController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyIsPermission,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { SchoolCreateSchema, SchoolUpdateSchema } from '../schemas'

export const schoolRouter = Router()

schoolRouter.post(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  validateSchemaMiddleware(SchoolCreateSchema),
  createSchoolController,
)

schoolRouter.get(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listSchoolController,
)

schoolRouter.get(
  '/verify/:id',
  verifyUserIsAuthenticated,
  verifySchoolController,
)

schoolRouter.get(
  '/:school_id',
  verifyUserIsAuthenticated,
  verifyIsPermission,
  retrieveSchoolController,
)

schoolRouter.patch(
  '/:school_id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  validateSchemaMiddleware(SchoolUpdateSchema),
  updateSchoolController,
)

schoolRouter.delete(
  '/:school_id',
  verifyUserIsAuthenticated,
  verifyIsPermission,
  deleteSchoolController,
)
