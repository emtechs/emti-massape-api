import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { PeriodCreateSchema, PeriodUpdateSchema } from '../schemas'
import { createPeriodController, updatePeriodController } from '../controllers'

export const periodRouter = Router()

periodRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PeriodCreateSchema),
  createPeriodController,
)

periodRouter.patch(
  '/:period_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PeriodUpdateSchema),
  updatePeriodController,
)
