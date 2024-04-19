import sortArray from 'sort-array'
import { IClassYearRetrieveManyRequest } from '../../interfaces'
import { retrieveClassYearService } from './retrive'

export const retrieveManyClassYearService = async ({
  classes,
}: IClassYearRetrieveManyRequest) => {
  const classData = await classReturnArray(classes)
  return sortArray(classData, {
    by: 'class_name',
    order: 'asc',
    computed: { class_name: (row) => row.class.name },
  })
}

const classReturnArray = async (classData: { key: string }[]) => {
  const classesData = classData.map((el) => retrieveClassYearService(el.key))

  return Promise.all(classesData).then((clsData) => {
    return clsData
  })
}
