import { Response, Request } from "express";
import { TaskModel } from "../models/task_model";

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await TaskModel.find();
  res.status(201).json({ tasks });
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTask = async (req: Request, res: Response) => {
  res.send({ id: req.params.id });
};

export const updateTask = async (req: Request, res: Response) => {
  res.send("Update task");
};

export const deleteTask = async (req: Request, res: Response) => {
  res.send("Delete task");
};
