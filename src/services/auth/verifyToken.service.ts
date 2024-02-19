import { AppError } from '../../errors'
import { authApi, prisma } from '../../lib'

export const verifyTokenService = async (token: string) => {
  const response = await authApi.get<string>(`token`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const id = response.data

  const user = await prisma.user.findFirst({
    where: { AND: { id, is_active: true } },
  })

  if (!user) throw new AppError('Not authorized', 401)

  return user
}
