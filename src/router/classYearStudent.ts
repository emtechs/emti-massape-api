import { Router } from 'express'
import { listClassYearStudentController } from '../controllers'
import { verifyUserIsAuthenticated } from '../middlewares'

export const classYearStudentRouter = Router()

classYearStudentRouter.get(
  '',
  verifyUserIsAuthenticated,
  listClassYearStudentController,
)
