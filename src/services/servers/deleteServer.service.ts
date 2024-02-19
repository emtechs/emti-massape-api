import { prisma } from '../../lib'

export const deleteServerService = async (id: string) => {
  const server = await prisma.schoolServer.delete({
    where: { id },
  })

  if (server.role === 'DIRET')
    await prisma.school.update({
      where: { id: server.school_id },
      data: { director: { disconnect: true } },
    })
}
