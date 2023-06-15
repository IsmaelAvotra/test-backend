import { Response, Request, NextFunction } from 'express'
import { asyncWrapper } from '../middleware/async_wrapper'
import { StudentModel } from '../models/student_model'
import { createCustomError } from '../errors/custom_error'

//get all students
export const getAllStudents = asyncWrapper(
  async (req: Request, res: Response) => {
    const students = await StudentModel.find({})
    res.status(200).json({ students })
  }
)

//create a student
export const createStudent = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const studentCreated = await StudentModel.create(req.body)
    res.status(201).json({ studentCreated })
  }
)

//edit a student
export const updateStudent = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: studentId } = req.params
    const studentEdited = await StudentModel.findByIdAndUpdate(
      { _id: studentId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!studentEdited) {
      return next(
        createCustomError(`No task with id : ${studentId} found`, 404)
      )
    }

    res.status(200).json({ studentEdited })
  }
)

//delete a student
export const deleteStudent = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: studentId } = req.params

    const studentDeleted = await StudentModel.findByIdAndDelete({
      _id: studentId,
    })

    if (!studentDeleted)
      return next(
        createCustomError(`No task with id : ${studentId} found`, 404)
      )

    res.status(200).json({ studentDeleted })
  }
)
