import { Response, Request, NextFunction } from 'express'
import { TaskModel } from '../models/task_model'
import { asyncWrapper } from '../../src/middleware/async_wraper'
import { createCustomError } from './../errors/custom_error'

interface Error {
  status?: number
  message: string
}

//get all tasks
export const getAllTasks = asyncWrapper(async (req: Request, res: Response) => {
  const tasks = await TaskModel.find({})
  res.status(200).json({ tasks })
})

//create a task
export const createTask = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const task = await TaskModel.create(req.body)
    res.status(201).json({ task })
  }
)

//get a task with taskId
export const getTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id: taskId } = req.params
    const task = await TaskModel.findById(taskId)

    if (!task) {
      return next(createCustomError(`No task with id : ${taskId} found`, 404))
    }

    res.status(200).json({ task })
  }
)

//update a task
export const updateTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskId } = req.params
    const task = await TaskModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return next(createCustomError(`No task with id : ${taskId} found`, 404))
    }

    res.status(200).json({ task })
  }
)
//delete a task
export const deleteTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskId } = req.params

    const task = await TaskModel.findByIdAndDelete(taskId)

    if (!task)
      return next(createCustomError(`No task with id : ${taskId} found`, 404))

    res.status(200).json({ task })
  }
)
