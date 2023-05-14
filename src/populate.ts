import 'dotenv/config'
import { connectDb } from './db/connect'

import { ProductModel } from './models/product_model'
const jsonProducts: JSON = require('./products.json')

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URL)
    await ProductModel.deleteMany()
    await ProductModel.insertMany(jsonProducts)
    console.log('success')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
