import { Request, Response } from 'express';
import Controller from './controller';

export default class HealthCheckController extends Controller {
  constructor() {
    super('/health-check');
  }

  protected handler(req: Request, res: Response) {
    return this.sendSuccess(res, { message: 'Express app is up and runnning' });
  }
}
