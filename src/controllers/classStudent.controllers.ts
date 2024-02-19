import { Request, Response } from 'express'
import {
  createClassSchoolStudentService,
  createClassStudentService,
  deleteClassStudentService,
  listClassStudentService,
  retrieveClassStudentService,
} from '../services'

export const createClassSchoolStudentController = async (
  req: Request,
  res: Response,
) => {
  const classStudent = await createClassSchoolStudentService(req.body)
  return res.status(201).json(classStudent)
}

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

export const listClassStudentController = async (
  req: Request,
  res: Response,
) => {
  const classes = await listClassStudentService(req.query)
  return res.json(classes)
}

export const retrieveClassStudentController = async (
  req: Request,
  res: Response,
) => {
  const classes = await retrieveClassStudentService(req.params.id)
  return res.json(classes)
}
