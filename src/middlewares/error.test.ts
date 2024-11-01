import { Request, Response } from 'express';

import Logger from '../util/logger';
import { errorHandler } from './errors';
import NotFoundError from '../errors/notFoundError';

jest.mock('../util/logger');
const mockedLogger = jest.mocked(Logger);

const nextFn = jest.fn();
const req = {} as Request;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
} as unknown as Response;

describe('Error handler middleware tests', () => {
  beforeEach(jest.clearAllMocks);

  describe('given generic error', () => {
    beforeEach(() => {
      errorHandler(new Error('Some random error'), req, res, nextFn);
    });

    afterEach(jest.clearAllMocks);

    it('logs the error', () => {
      expect(mockedLogger.error).toHaveBeenCalled();
    });

    it('return 500 response code', () => {
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('return internal server error message', () => {
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error', statusCode: 500 });
    });
  });

  describe('given custom error', () => {
    beforeEach(() => {
      errorHandler(new NotFoundError(), req, res, nextFn);
    });

    afterEach(jest.clearAllMocks);

    it('logs the error', () => {
      expect(mockedLogger.error).toHaveBeenCalled();
    });

    it('return the custom error response code', () => {
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('return the custom error message', () => {
      expect(res.json).toHaveBeenCalledWith({ statusCode: 404, error: 'The requested resources was not found' });
    });
  });
});
