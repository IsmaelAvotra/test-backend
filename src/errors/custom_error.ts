export class CustomAPIError {
  message!: string
  statusCode!: number

  constructor(message: string, statusCode: number) {
    this.message = message
    this.statusCode = statusCode
  }
}

export const createCustomError = (msg: string, statusCode: number) => {
  return new CustomAPIError(msg, statusCode)
}
