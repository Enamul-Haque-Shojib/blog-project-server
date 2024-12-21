class AppError extends Error {
  public statusCode: number;
  public status: string;

  constructor(statusCode: number, message: string, status:string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.status = status;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
