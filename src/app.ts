import 'express-async-errors'
import express from 'express'
import { errorHandler } from './errors'
import {
  calendarRouter,
  classRouter,
  classStudentRouter,
  classYearRouter,
  frequencyRouter,
  infrequencyRouter,
  schoolRouter,
  serverRouter,
  studentRouter,
  tokenRouter,
  userRouter,
} from './router'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  next()
})

app.use('/users', userRouter)
app.use('/schools', schoolRouter)
app.use('/servers', serverRouter)
app.use('/classes', classRouter)
app.use('/classstudent', classStudentRouter)
app.use('/classyear', classYearRouter)
app.use('/students', studentRouter)
app.use('/frequencies', frequencyRouter)
app.use('/infrequencies', infrequencyRouter)
app.use('/calendar', calendarRouter)
app.use('/token', tokenRouter)

app.use(errorHandler)

export default app
