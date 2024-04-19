import { Request, Response } from 'express'
import {
  createSchoolService,
  deleteSchoolService,
  listSchoolService,
  retrieveSchoolService,
  updateSchoolService,
  verifySchoolService,
} from '../services'

export const createSchoolController = async (req: Request, res: Response) => {
  const school = await createSchoolService(req.body)
  return res.status(201).json(school)
}

export const listSchoolController = async (req: Request, res: Response) => {
  const schools = await listSchoolService(req.query)
  return res.json(schools)
}

export const retrieveSchoolController = async (req: Request, res: Response) => {
  const school = await retrieveSchoolService(req.params.school_id, req.query)
  return res.json(school)
}

export const updateSchoolController = async (req: Request, res: Response) => {
  const school = await updateSchoolService(req.params.school_id, req.body)
  return res.json(school)
}

export const deleteSchoolController = async (req: Request, res: Response) => {
  await deleteSchoolService(req.params.school_id)
  return res.status(204).json({})
}

export const verifySchoolController = async (req: Request, res: Response) => {
  await verifySchoolService(req.params.id)
  return res.json({})
}
