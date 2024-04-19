import { AppError } from '../../errors'
import { emtiApi, prisma } from '../../lib'

export const retrieveClassYearService = async (key: string) => {
  const classYear = await prisma.classYear.findUnique({
    where: { key },
    include: { school: true },
  })

  if (!classYear) throw new AppError('class not found', 404)

  const { data } = await emtiApi.get<{ id: string; name: string }>(
    `classes/${classYear.class_id}`,
  )

  return { ...classYear, class: data }
}
