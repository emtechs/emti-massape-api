import { Router } from 'express'
import {
  connectServerController,
  createServerController,
  deleteServerController,
  listSchoolServerController,
  listServerController,
  retrieveServerController,
  verifyServerController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyIsPermission,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { SchoolServerCreateSchema } from '../schemas'

export const serverRouter = Router()

serverRouter.post(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  validateSchemaMiddleware(SchoolServerCreateSchema),
  createServerController,
)

serverRouter.post(
  '/connect',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  validateSchemaMiddleware(SchoolServerCreateSchema),
  connectServerController,
)

serverRouter.get(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listServerController,
)

serverRouter.get(
  '/schools',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listSchoolServerController,
)

serverRouter.get(
  '/verify/:id',
  verifyUserIsAuthenticated,
  verifyServerController,
)

serverRouter.get(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsPermission,
  retrieveServerController,
)

serverRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsPermission,
  deleteServerController,
)
