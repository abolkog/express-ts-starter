import { CustomError } from './customError';

export default class Unauthorised extends CustomError {
  private static readonly _statusCode = 403;
  private readonly _logging: boolean;

  constructor(message?: string, logging?: boolean) {
    super(message || 'You are not authorised to access the requested resources');
    this._logging = logging || true;

    Object.setPrototypeOf(this, Unauthorised.prototype);
  }

  get statusCode() {
    return Unauthorised._statusCode;
  }

  get logging() {
    return this._logging;
  }
}
