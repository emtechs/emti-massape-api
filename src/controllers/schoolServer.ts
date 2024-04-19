import { Request, Response } from 'express'
import { deleteSchoolServerService } from '../services'

export const deleteSchoolServerController = async (
  req: Request,
  res: Response,
) => {
  await deleteSchoolServerService(req.params.id)
  return res.status(204).json({})
}
