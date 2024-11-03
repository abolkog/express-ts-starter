import { NextFunction, Request, Response } from 'express';

const ignoredUrls = ['/favicon.ico'];

/**
 * Middleware to handle unsupported favicon requests
 * @param req Http request instance
 * @param res Http reesponse instance
 * @param next Next function
 */
export const ignoreFavicon = (req: Request, res: Response, next: NextFunction) => {
  const { path } = req;
  if (ignoredUrls.includes(path)) {
    return res.status(204).end();
  }

  next();
};
