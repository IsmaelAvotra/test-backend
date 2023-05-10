import express, { Response, Request } from 'express'

export const getAllTasks = async (req: Request, res: Response) => {
  res.send('get all tasks')
}

export const createTask = async (req: Request, res: Response) => {
  res.send(req.body)
}

export const getTask = async (req: Request, res: Response) => {
  res.send({ id: req.params.id })
}

export const updateTask = async (req: Request, res: Response) => {
  res.send('Update task')
}

export const deleteTask = async (req: Request, res: Response) => {
  res.send('Delete task')
}
