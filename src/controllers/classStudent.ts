import { Request, Response } from 'express'
import {
  createClassStudentService,
  deleteClassStudentService,
  retrieveClassStudentService,
} from '../services'

export const createClassStudentController = async (
  req: Request,
  res: Response,
) => {
  const classStudent = await createClassStudentService(req.body)
  return res.status(201).json(classStudent)
}

export const deleteClassStudentController = async (
  req: Request,
  res: Response,
) => {
  await deleteClassStudentService(req.params.id)
  return res.status(204).json({})
}

export const retrieveClassStudentController = async (
  req: Request,
  res: Response,
) => {
  const classes = await retrieveClassStudentService(req.params.id)
  return res.json(classes)
}
