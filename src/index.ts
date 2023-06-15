import express from 'express'
import 'dotenv/config'

import { connectDb } from './db/connect'
import { notFoundMiddleware } from './middleware/not_found'
import { errorHandlerMiddleware } from './middleware/error_handler'
import { studentsRouter } from './routes/students'

const app = express()
const port = process.env.PORT || 3000
const dbUrl = process.env.MONGODB_URL

// Middleware
app.use(express.json())

// Routes
app.use('/students', studentsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDb(dbUrl)
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
