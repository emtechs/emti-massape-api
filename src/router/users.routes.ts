import { Router } from 'express'
import {
  createUserController,
  dashUserController,
  listSchoolUserController,
  listUserController,
  pageUserController,
  profileUserController,
  retrieveUserController,
  updateUserController,
  verifyUserController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { UserCreateSchema, UserUpdateRequestSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(UserCreateSchema),
  createUserController,
)

userRouter.get('', verifyUserIsAuthenticated, verifyIsAdmin, listUserController)

userRouter.get(
  '/schools',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listSchoolUserController,
)

userRouter.get('/page', verifyUserIsAuthenticated, pageUserController)

userRouter.get('/profile', verifyUserIsAuthenticated, profileUserController)

userRouter.get('/dash/:year_id', verifyUserIsAuthenticated, dashUserController)

userRouter.get('/verify/:id', verifyUserIsAuthenticated, verifyUserController)

userRouter.get('/:id', verifyUserIsAuthenticated, retrieveUserController)

userRouter.patch(
  '/:id',
  validateSchemaMiddleware(UserUpdateRequestSchema),
  verifyUserIsAuthenticated,
  updateUserController,
)
