import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/customError';
import Logger from '../util/logger';
import { errorResponse } from '../util/response';

/**
 * Error handler middleware, logs error if logging enabled for our custom errors and return status code
 * @param err The error to handle
 * @param req request instance
 * @param res response instance
 * @param _next next function
 * @returns
 */
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) {
    const { statusCode, message, logging } = err;
    if (logging) {
      Logger.error(
        JSON.stringify(
          {
            code: statusCode,
            requestedUrl: req.path,
            message: message,
            stack: err.stack
          },
          null,
          2
        )
      );
    }

    return res.status(statusCode).json(errorResponse(message, statusCode));
  }

  // Unhandled errors
  Logger.error(err);
  return res.status(500).json(errorResponse('Internal server error', 500));
};
