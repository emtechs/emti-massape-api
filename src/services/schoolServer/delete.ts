import { prisma } from '../../lib'

export const deleteSchoolServerService = async (key: string) => {
  await prisma.schoolServer.delete({
    where: { key },
  })
}
