import express from 'express'
const app = express()
import 'dotenv/config'

const port = process.env.PORT

app.listen(port, () => console.log(`Server running on port  ${port}`))
