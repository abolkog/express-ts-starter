import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { App } from './app';
import HealthCheckController from './controllers/healthCheck.controller';
import Controller from './controllers/controller';
import { AppConfig } from './util/appConfig';

jest.mock('./util/appConfig');
const mockedAppConfig = AppConfig as jest.Mocked<typeof AppConfig>;

class BrokenController extends Controller {
  constructor() {
    super('/broken-endpoint');
  }

  protected handler(_req: Request, _res: Response, _next: NextFunction) {
    throw new Error('Ops');
  }
}

describe('app test', () => {
  const { app } = new App(2000, [new HealthCheckController(), new BrokenController()]);

  describe('GET /health-check', () => {
    it('should return health check message', async () => {
      const res = await request(app).get('/health-check');
      const { body, statusCode } = res;
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('data', { message: 'Express app is up and running' });
    });
  });

  describe('given unkown or invalid url', () => {
    it('should return 404 response', async () => {
      const res = await request(app).get('/invalid-url');
      const { body, statusCode } = res;
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('error', 'The requested resources was not found');
    });
  });

  describe('given unexpected error', () => {
    it('should catch the error', async () => {
      const res = await request(app).get('/broken-endpoint');
      const { body, statusCode } = res;
      expect(statusCode).toBe(500);
      expect(body).toHaveProperty('error', 'Internal server error');
    });
  });

  describe('given the api key middleware is enabled', () => {
    beforeAll(() => {
      mockedAppConfig.useApiMiddleware = true;
      process.env['APP_API_KEY'] = '123';
    });

    afterAll(jest.clearAllMocks);

    describe('and no x-api-key in the headers', () => {
      it('should return access denied', async () => {
        const res = await request(app).get('/url');
        const { body, statusCode } = res;
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty('error', 'You are not authorised to access the requested resources');
      });
    });

    describe('and invalid x-api-key in the headers', () => {
      it('should return access denied', async () => {
        const res = await request(app).get('/url').set('x-api-key', 'invalid-key');
        const { body, statusCode } = res;
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty('error', 'You are not authorised to access the requested resources');
      });
    });

    describe('and the requested url is /health-check', () => {
      it('should OK response', async () => {
        const res = await request(app).get('/health-check');
        const { body, statusCode } = res;
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('data', { message: 'Express app is up and running' });
      });
    });
  });
});
