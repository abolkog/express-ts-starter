import { NextFunction, Request, Response } from 'express';

import UnauthorisedError from '../errors/unauthorisedError';
import { getEnvWithDefaultValue } from '../util/env';
import { AppConfig } from '../util/appConfig';
import Logger from '../util/logger';

// List of endpoints that we do not want to run the api key middleware against.
const ignoredEndpoints = ['/health-check'];

/**
 * Middleware to check for API key in the request header
 * @param req Http request instance
 * @param _res Http response instance
 * @param next Next function
 */
export const apiKey = (req: Request, _res: Response, next: NextFunction) => {
  if (!AppConfig.useApiMiddleware) {
    Logger.debug(`API key middleware is disabled`);
    return next();
  }

  const { path } = req;
  if (ignoredEndpoints.includes(path)) {
    return next();
  }

  const { headers } = req;
  const apiKeyFromHeader = headers['x-api-key'];
  const apiKey = getEnvWithDefaultValue('APP_API_KEY', '');
  if (!apiKeyFromHeader || apiKeyFromHeader !== apiKey) throw new UnauthorisedError();

  next();
};
