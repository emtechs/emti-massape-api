import { Request, Response } from 'express'
import {
  createClassService,
  listClassService,
  dashClassService,
  listClassDashService,
  retrieveClassService,
  transferClassStudentService,
  updateClassService,
  verifyClassService,
} from '../services'

export const createClassController = async (req: Request, res: Response) => {
  const classData = await createClassService(req.body)
  return res.status(201).json(classData)
}

export const dashClassController = async (req: Request, res: Response) => {
  const dash = await dashClassService(
    req.params.class_id,
    req.params.school_id,
    req.params.year_id,
    req.query,
  )
  return res.json(dash)
}

export const listClassController = async (req: Request, res: Response) => {
  const classes = await listClassService(req.query)
  return res.json(classes)
}

export const listClassDashController = async (req: Request, res: Response) => {
  const classes = await listClassDashService(
    req.params.school_id,
    req.params.year_id,
    req.query,
  )
  return res.json(classes)
}

export const retrieveClassController = async (req: Request, res: Response) => {
  const classes = await retrieveClassService(req.params.class_id, req.query)
  return res.json(classes)
}

export const updateClassController = async (req: Request, res: Response) => {
  const classData = await updateClassService(req.params.id, req.body)
  return res.json(classData)
}

export const transferClassStudentController = async (
  req: Request,
  res: Response,
) => {
  const classes = await transferClassStudentService(req.body)
  return res.json(classes)
}

export const verifyClassController = async (req: Request, res: Response) => {
  await verifyClassService(req.params.id)
  return res.json({})
}
