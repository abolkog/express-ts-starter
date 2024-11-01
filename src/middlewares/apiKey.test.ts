import { Request, Response } from 'express';

import { apiKey } from './apiKey';
import Unauthorised from '../errors/unauthorisedError';
import { mockRequest } from '../util/testUtils';
import { AppConfig } from '../util/appConfig';

jest.mock('../util/appConfig');
const mockedAppConfig = AppConfig as jest.Mocked<typeof AppConfig>;

describe('API Key middleware tests', () => {
  const nextFn = jest.fn();
  const resp = {} as Response;

  describe('given api key middleware is disabled', () => {
    it('does not throw unauthorised error', () => {
      expect(() => apiKey(mockRequest({}) as Request, resp, nextFn)).not.toThrow();
    });

    it('calls the next function', () => {
      apiKey(mockRequest({}) as Request, resp, nextFn);
      expect(nextFn).toHaveBeenCalled();
    });
  });

  describe('given api middleware is enabled', () => {
    beforeEach(jest.clearAllMocks);

    beforeAll(() => {
      mockedAppConfig.useApiMiddleware = true;
      process.env['APP_API_KEY'] = '123';
    });

    describe('and no api key in the header', () => {
      let error: Error;

      beforeAll(() => {
        try {
          apiKey(mockRequest({}) as Request, resp, nextFn);
        } catch (e) {
          error = e as unknown as Error;
        }
      });

      it('throw unauthorised error', () => {
        expect(error).toBeInstanceOf(Unauthorised);
      });

      it('does not call the next function', () => {
        expect(nextFn).not.toHaveBeenCalled();
      });
    });

    describe('and invalid api key in the header', () => {
      let error: Error;

      beforeAll(() => {
        try {
          apiKey(
            mockRequest({
              headers: {
                'x-api-key': 'invalid'
              }
            }) as Request,
            resp,
            nextFn
          );
        } catch (e) {
          error = e as unknown as Error;
        }
      });

      it('throw unauthorised error', () => {
        expect(error).toBeInstanceOf(Unauthorised);
      });

      it('does not call the next function', () => {
        expect(nextFn).not.toHaveBeenCalled();
      });
    });

    describe('and a valid api key in the header', () => {
      let error: Error;

      beforeEach(() => {
        try {
          apiKey(
            mockRequest({
              headers: {
                'x-api-key': '123'
              }
            }) as Request,
            resp,
            nextFn
          );
        } catch (e) {
          error = e as unknown as Error;
        }
      });

      it('does not throw unauthorised error', () => {
        expect(error).toBeUndefined();
      });

      it('calls the next function', () => {
        expect(nextFn).toHaveBeenCalled();
      });
    });
  });
});
