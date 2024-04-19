import { Request, Response } from 'express'
import {
  createClassYearService,
  deleteClassYearService,
  retrieveClassYearService,
  retrieveManyClassYearService,
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

export const retrieveClassYearController = async (
  req: Request,
  res: Response,
) => {
  const classes = await retrieveClassYearService(req.params.id)
  return res.json(classes)
}

export const retrieveManyClassYearController = async (
  req: Request,
  res: Response,
) => {
  const classes = await retrieveManyClassYearService(req.body)
  return res.json(classes)
}
