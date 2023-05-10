import express from 'express'
import tasksRouter from './routes/tasks'
import 'dotenv/config'

const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasksRouter)

app.listen(port, () => console.log(`Server running on port  ${port}`))
