import { Request, Response } from 'express'
import {
  createStudentService,
  listStudentService,
  retrieveStudentService,
  updateStudentService,
} from '../services'

export const createStudentController = async (req: Request, res: Response) => {
  const student = await createStudentService(req.body)
  return res.status(201).json(student)
}

export const listStudentController = async (req: Request, res: Response) => {
  const students = await listStudentService(req.query)
  return res.json(students)
}

export const retrieveStudentController = async (
  req: Request,
  res: Response,
) => {
  const student = await retrieveStudentService(req.params.id)
  return res.json(student)
}

export const updateStudentController = async (req: Request, res: Response) => {
  const student = await updateStudentService(req.body, req.params.id)
  return res.json(student)
}
