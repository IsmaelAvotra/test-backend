import mongoose from 'mongoose'

export const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstname must be provided'],
  },
  lastName: {
    type: String,
    required: [true, 'lastname must be provided'],
  },
  birthDate: {
    type: String,
    required: [true, 'date of birth must be provided'],
  },
  email: {
    type: String,
    required: [true, 'email must be provided'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

export const StudentModel = mongoose.model('Student', studentSchema)
