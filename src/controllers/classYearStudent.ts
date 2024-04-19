import { Request, Response } from 'express'
import { listClassYearStudentService } from '../services'

export const listClassYearStudentController = async (
  req: Request,
  res: Response,
) => {
  const students = await listClassYearStudentService(req.query)
  return res.json(students)
}
