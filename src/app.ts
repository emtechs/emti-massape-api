import 'express-async-errors'
import express from 'express'
import { errorHandler } from './errors'
import {
  classStudentRouter,
  classYearRouter,
  schoolRouter,
  schoolServerRouter,
  studentRouter,
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
app.use('/schoolserver', schoolServerRouter)
app.use('/classstudent', classStudentRouter)
app.use('/classyear', classYearRouter)
app.use('/students', studentRouter)

app.use(errorHandler)

export default app
