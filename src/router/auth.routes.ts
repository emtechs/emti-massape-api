import { Router } from 'express'
import { verifyTokenController } from '../controllers'

export const tokenRouter = Router()

tokenRouter.get('/:token', verifyTokenController)
