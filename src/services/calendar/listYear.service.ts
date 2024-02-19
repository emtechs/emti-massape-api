import { prisma } from '../../lib'

export const listYearService = async () => {
  const years = await prisma.year.findMany({ orderBy: { year: 'desc' } })

  return years
}
