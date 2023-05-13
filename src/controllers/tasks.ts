import { Response, Request } from 'express'
import { TaskModel } from '../models/task_model'
import { asyncWrapper } from '../../src/middleware/async_wraper'

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
  async (req: Request, res: Response): Promise<void> => {
    const { id: taskId } = req.params
    const task = await TaskModel.findById(taskId)

    if (!task)
      res.status(404).json({ msg: `Task with id:${taskId} is not found` })

    res.status(200).json({ task })
  }
)

//update a task
export const updateTask = asyncWrapper(async (req: Request, res: Response) => {
  const { id: taskId } = req.params
  const task = await TaskModel.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    res.status(404).json({ msg: `Task with id:${taskId} is not found` })
  }

  res.status(200).json({ task })
})
//delete a task
export const deleteTask = asyncWrapper(async (req: Request, res: Response) => {
  const { id: taskId } = req.params

  const task = await TaskModel.findByIdAndDelete(taskId)

  if (!task)
    res.status(404).json({ msg: `Task with id:${taskId} does not exist` })

  res.status(200).json({ task })
})
