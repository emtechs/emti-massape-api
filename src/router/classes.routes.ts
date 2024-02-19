import { Router } from 'express'
import {
  createClassController,
  dashClassController,
  listClassController,
  listClassDashController,
  retrieveClassController,
  retrieveClassYearController,
  updateClassController,
  verifyClassController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyIsPermission,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { ClassCreateSchema, ClassUpdateSchema } from '../schemas'

export const classRouter = Router()

classRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(ClassCreateSchema),
  createClassController,
)

classRouter.get('', verifyUserIsAuthenticated, listClassController)

classRouter.get('/verify/:id', verifyUserIsAuthenticated, verifyClassController)

classRouter.get(
  '/year/:key/view',
  verifyUserIsAuthenticated,
  retrieveClassYearController,
)

classRouter.get(
  '/school/:school_id/dash/:year_id',
  verifyUserIsAuthenticated,
  verifyIsPermission,
  listClassDashController,
)

classRouter.get(
  '/:class_id',
  verifyUserIsAuthenticated,
  retrieveClassController,
)

classRouter.get(
  '/:class_id/:school_id/:year_id/dash',
  verifyUserIsAuthenticated,
  verifyIsPermission,
  dashClassController,
)

classRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  validateSchemaMiddleware(ClassUpdateSchema),
  updateClassController,
)
