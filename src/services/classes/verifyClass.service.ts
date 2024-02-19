import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifyClassService = async (id: string) => {
  const classData = await prisma.class.findUnique({
    where: { id },
    select: { id: true },
  })

  if (!classData) throw new AppError('class not found', 404)
}
