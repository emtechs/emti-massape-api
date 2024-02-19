import { Request, Response } from 'express'
import {
  connectServerService,
  createServerService,
  deleteServerService,
  listSchoolServerService,
  listServerService,
  retrieveServerService,
  verifyServerService,
} from '../services'

export const connectServerController = async (req: Request, res: Response) => {
  const server = await connectServerService(req.body)
  return res.status(201).json(server)
}

export const createServerController = async (req: Request, res: Response) => {
  await createServerService(req.body)
  return res.status(201).json({})
}

export const listSchoolServerController = async (
  req: Request,
  res: Response,
) => {
  const schools = await listSchoolServerService(req.query)
  return res.json(schools)
}

export const listServerController = async (req: Request, res: Response) => {
  const servers = await listServerService(req.query)
  return res.json(servers)
}

export const retrieveServerController = async (req: Request, res: Response) => {
  const school = await retrieveServerService(req.params.id)
  return res.json(school)
}

export const deleteServerController = async (req: Request, res: Response) => {
  await deleteServerService(req.params.id)
  return res.status(204).json({})
}

export const verifyServerController = async (req: Request, res: Response) => {
  await verifyServerService(req.params.id)
  return res.json({})
}
