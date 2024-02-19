import { Request, Response } from 'express'
import {
  createUserService,
  dashUserService,
  listSchoolUserService,
  listUserService,
  pageUserService,
  retrieveUserService,
  updateUserService,
  verifyUserService,
} from '../services'

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body)
  return res.status(201).json(user)
}

export const listSchoolUserController = async (req: Request, res: Response) => {
  const schools = await listSchoolUserService(req.query, req.user)
  return res.json(schools)
}

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService(req.query, req.user.id)
  return res.json(users)
}

export const pageUserController = async (req: Request, res: Response) => {
  const user = await pageUserService(req.user.id, req.query)
  return res.json(user)
}

export const retrieveUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.params.id)
  return res.json(user)
}

export const profileUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.user.id)
  return res.json(user)
}

export const dashUserController = async (req: Request, res: Response) => {
  const user = await dashUserService(req.params.year_id)
  return res.json(user)
}

export const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.params.id, req.body, req.user.role)
  return res.json(user)
}

export const verifyUserController = async (req: Request, res: Response) => {
  await verifyUserService(req.params.id)
  return res.json({})
}
