import { Request, Response } from 'express'
import { verifyTokenService } from '../services'

export const verifyTokenController = async (req: Request, res: Response) => {
  await verifyTokenService(req.params.token)

  return res.json({})
}
