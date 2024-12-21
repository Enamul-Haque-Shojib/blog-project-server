class AppError extends Error {
  public statusCode: number;
  public details: string;

  constructor(statusCode: number, message: string, details: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
