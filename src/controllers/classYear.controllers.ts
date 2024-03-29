import { Request, Response } from 'express'
import {
  createClassYearService,
  deleteClassYearService,
  listClassYearService,
  listSchoolClassYearService,
  retrieveClassYearService,
} from '../services'

export const createClassYearController = async (
  req: Request,
  res: Response,
) => {
  const classSchool = await createClassYearService(req.body)
  return res.status(201).json(classSchool)
}

export const deleteClassYearController = async (
  req: Request,
  res: Response,
) => {
  await deleteClassYearService(req.params.id)
  return res.status(204).json({})
}

export const listClassYearController = async (req: Request, res: Response) => {
  const classes = await listClassYearService(req.query)
  return res.json(classes)
}

export const listSchoolClassYearController = async (
  req: Request,
  res: Response,
) => {
  const classes = await listSchoolClassYearService(req.query)
  return res.json(classes)
}

export const retrieveClassYearController = async (
  req: Request,
  res: Response,
) => {
  const classes = await retrieveClassYearService(req.params.id)
  return res.json(classes)
}
