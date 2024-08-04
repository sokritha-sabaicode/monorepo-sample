import { HTTP_STATUS_CODE } from '../constants/status-code';

// ========================
// Base Error
// ========================

export class ApplicationError extends Error {
  public readonly status: number;
  public errors?: {};

  constructor({ message, status, errors }: { message: string, status: number, errors?: {} }) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

// ========================
// Client Error
// ========================

export class InvalidInputError extends ApplicationError {
  constructor({ message = "Invalid input provided.", errors }: { message?: string, errors?: {} }) {
    super({ message, status: HTTP_STATUS_CODE.BAD_REQUEST, errors });
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message = "The requested resource was not found.") {
    super({ message, status: HTTP_STATUS_CODE.NOT_FOUND });
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message = "Authentication failed. Please check your credentials.") {
    super({ message, status: HTTP_STATUS_CODE.UNAUTHORIZED });
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message = "You do not have permission to access this resource.") {
    super({ message, status: HTTP_STATUS_CODE.FORBIDDEN });
  }
}

export class ResourceConflictError extends ApplicationError {
  constructor(message = "Resource conflict occurred. The resource might already exist.") {
    super({ message, status: HTTP_STATUS_CODE.CONFLICT });
  }
}

// ========================
// Server Error
// ========================

export class InternalServerError extends ApplicationError {
  constructor({ message = "An internal server error occurred.", errors }: { message: string, errors?: {} }) {
    super({ message, status: HTTP_STATUS_CODE.SERVER_ERROR, errors });
  }
}
