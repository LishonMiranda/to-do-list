import express from 'express'
import tasks from './routes/tasks.js'
import errorHandler from './middleware/errors.js'
import auth from './routes/user.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/tasks', tasks)
app.use('/api/auth', auth)
app.use(errorHandler)


export default app;
