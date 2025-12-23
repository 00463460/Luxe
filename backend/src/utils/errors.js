// Custom Error Classes for API
// Used throughout the backend for consistent error handling

export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation error') {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Not authorized') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}
