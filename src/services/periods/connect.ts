import { IYearRequest } from '../../interfaces'
import { createPeriodService } from './create'

export const connectPeriodService = async ({ year }: IYearRequest) => {
  await Promise.all([
    createPeriodService({
      name: year,
      category: 'ANO',
      initial: `01/01/${year}`,
      final: `31/12/${year}`,
      year,
    }),
    createPeriodService({
      name: '1º Bimestre',
      category: 'BIMESTRE',
      initial: `01/01/${year}`,
      final: `30/04/${year}`,
      year,
    }),
    createPeriodService({
      name: '2º Bimestre',
      category: 'BIMESTRE',
      initial: `01/05/${year}`,
      final: `31/07/${year}`,
      year,
    }),
    createPeriodService({
      name: '3º Bimestre',
      category: 'BIMESTRE',
      initial: `01/08/${year}`,
      final: `30/09/${year}`,
      year,
    }),
    createPeriodService({
      name: '4º Bimestre',
      category: 'BIMESTRE',
      initial: `01/10/${year}`,
      final: `31/12/${year}`,
      year,
    }),
    createPeriodService({
      name: '1º Semestre',
      category: 'SEMESTRE',
      initial: `01/01/${year}`,
      final: `31/07/${year}`,
      year,
    }),
    createPeriodService({
      name: '2º Semestre',
      category: 'SEMESTRE',
      initial: `01/08/${year}`,
      final: `31/12/${year}`,
      year,
    }),
  ])
}
