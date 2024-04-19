import { Request, Response } from 'express'
import {
  createUserService,
  listSchoolUserService,
  listUserService,
  retrieveUserService,
  updateUserService,
  verifyUserService,
} from '../services'
import { emtiApi } from '../lib'

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body)
  return res.status(201).json(user)
}

export const listModulesUserController = async (
  req: Request,
  res: Response,
) => {
  const { data } = await emtiApi.get(
    `moduleuser?county_id=eeebd7a0-d73a-4d3f-9b63-a6a3d1eb2aa8&user_id=${req.user.id}`,
  )

  return res.json(data)
}

export const listSchoolUserController = async (req: Request, res: Response) => {
  const schools = await listSchoolUserService(req.query, req.user)
  return res.json(schools)
}

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService(req.query, req.user.id)
  return res.json(users)
}

export const retrieveUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.params.id)
  return res.json(user)
}

export const profileUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.user.id)

  return res.json(user)
}

export const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService(
    req.params.id,
    req.body,
    req.user.is_admin,
  )
  return res.json(user)
}

export const verifyUserController = async (req: Request, res: Response) => {
  await verifyUserService(req.params.id)
  return res.json({})
}
