/* eslint-disable @typescript-eslint/no-unused-vars */
import { authApi, prisma } from '../../lib'
import { IUserRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createUserService = async ({ id, role }: IUserRequest) => {
  const [_, userData] = await Promise.all([
    authApi.get<string>(`users/${id}`),
    prisma.user.findUnique({
      where: { id },
    }),
  ])

  if (userData) throw new AppError('user already exists', 409)

  await prisma.user.create({ data: { id, role } })
}
