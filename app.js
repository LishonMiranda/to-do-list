import express from 'express'
import tasks from './routes/tasks.js'
import errorHandler from './middleware/errors.js'
const app = express()

app.use(express.json())
app.use('/api/tasks', tasks)
app.use(errorHandler)

export default app;
