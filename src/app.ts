import express, { Application, Request, Response, NextFunction } from 'express';

import Logger from './util/logger';
import { errorHandler } from './middlewares/errors';
import NotFoundError from './errors/notFoundError';
import Controller from './controllers/controller';

export class App {
  public app: Application;

  /**
   * @param port Port Application listens on
   */
  constructor(
    private port: number,
    controllers: Controller[]
  ) {
    this.app = express();
    this.initMiddlewares();
    this.initControllers(controllers);
    this.initErrorHandlers();
  }

  /**
   * Setup middlewares
   */
  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * initalise routes
   * @param controllers controllers list
   */
  private initControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use(controller.router);
    });
  }

  private initErrorHandlers() {
    // 404
    const notFoundError = new NotFoundError();
    this.app.use((req: Request, res: Response, next: NextFunction) => next(notFoundError));

    // Error handler
    this.app.use(errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Express app is running and listening on port ${this.port}`);
    });
  }
}
