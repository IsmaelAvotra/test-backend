import { Request, Response, NextFunction } from 'express'
import { CustomAPIError } from '../errors/custom_error'

interface Error {
  status?: number
  message: string
}

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}
