import { Router } from 'express'
import {
  createUserController,
  listClassUserController,
  listModulesUserController,
  listSchoolUserController,
  listUserController,
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

userRouter.get('/modules', verifyUserIsAuthenticated, listModulesUserController)

userRouter.get('/classes', verifyUserIsAuthenticated, listClassUserController)

userRouter.get('/schools', verifyUserIsAuthenticated, listSchoolUserController)

userRouter.get('/profile', verifyUserIsAuthenticated, profileUserController)

userRouter.get('/verify/:id', verifyUserIsAuthenticated, verifyUserController)

userRouter.get('/:id', verifyUserIsAuthenticated, retrieveUserController)

userRouter.patch(
  '/:id',
  validateSchemaMiddleware(UserUpdateRequestSchema),
  verifyUserIsAuthenticated,
  updateUserController,
)
