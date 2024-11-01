import { CustomError } from './customError';

export default class ServiceError extends CustomError {
  private static readonly _statusCode = 500;
  private readonly _logging: boolean;

  constructor(serviceName: string, message?: string, logging?: boolean) {
    super(message || `Error in service: ${serviceName}`);
    this._logging = logging || true;

    Object.setPrototypeOf(this, ServiceError.prototype);
  }

  get statusCode() {
    return ServiceError._statusCode;
  }

  get logging() {
    return this._logging;
  }
}
