import { Request, Response } from 'express'
import { createPeriodService, updatePeriodService } from '../services'

export const createPeriodController = async (req: Request, res: Response) => {
  const period = await createPeriodService(req.body)
  return res.status(201).json(period)
}

export const updatePeriodController = async (req: Request, res: Response) => {
  const period = await updatePeriodService(req.body, req.params.period_id)
  return res.json(period)
}
