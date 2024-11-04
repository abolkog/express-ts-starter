import { Request, Response } from 'express';

import { ignoreFavicon } from './ignoreFavicon';
import { mockRequest } from '../util/testUtils';

jest.mock('../util/appConfig');

describe('Ignore Favicon middleware tests', () => {
  const nextFn = jest.fn();
  const resp = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis()
  } as unknown as Response;

  describe('given a request for ignore url', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      ignoreFavicon(mockRequest({ path: '/favicon.ico' }) as Request, resp, nextFn);
    });

    it('return 204 response', () => {
      expect(resp.status).toHaveBeenCalledWith(204);
    });

    it('does not call the next function', () => {
      expect(nextFn).not.toHaveBeenCalled();
    });
  });

  describe('give a valid request', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      ignoreFavicon(mockRequest({ path: '/api' }) as Request, resp, nextFn);
    });

    it('does not return a response', () => {
      expect(resp.end).not.toHaveBeenCalled();
    });

    it('call the next function', () => {
      expect(nextFn).toHaveBeenCalled();
    });
  });
});
