import { CustomError } from './customError';

export default class NotFoundError extends CustomError {
  private static readonly _statusCode = 404;
  private readonly _logging: boolean;

  constructor(message?: string, logging?: boolean) {
    super(message || 'The requested resources was not found');
    this._logging = logging || true;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  get statusCode() {
    return NotFoundError._statusCode;
  }

  get logging() {
    return this._logging;
  }
}
