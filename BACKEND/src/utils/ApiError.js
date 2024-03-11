class ApiError extends Error {
  constructor(
    statusCode,
    message = "someThing went worng",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constuctor);
    }
  }
}

export { ApiError };
