import express from 'express'
export const studentsRouter = express.Router()

import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from '../controllers/students'

studentsRouter.route('/').get(getAllStudents)
studentsRouter.route('/create').post(createStudent)
studentsRouter.route('/edit/:id').patch(updateStudent)
studentsRouter.route('/delete/:id').delete(deleteStudent)
