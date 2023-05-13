import mongoose from 'mongoose'

export const connectDb = (url: string) => {
  return mongoose.set('strictQuery', false), mongoose.connect(url)
}
