import { Response, NextFunction, Router, Request } from 'express';
import { errorResponse, ResponseMeta, successResponse } from '../util/response';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * Abstract base class for creating controllers in an Express application.
 * This class sets up a router and binds a specified HTTP method and path to the handler method.
 */
abstract class Controller {
  /**
   * The Express router instance used to define routes.
   */
  public router = Router();

  /**
   * Creates an instance of Controller.
   * Binds the specified HTTP method and path to the handler method.
   *
   * @param path - The path for the route.
   * @param method - The HTTP method for the route. Defaults to 'get'.
   * @param middlewares - Optional middleware to apply to the controller
   */
  constructor(path: string, method: HttpMethod = 'get', middlewares: Middleware[] = []) {
    this.router[method](path, ...middlewares, this.handler.bind(this));
  }

  /**
   * Abstract method to handle incoming requests.
   * This method must be implemented by subclasses.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param _next - The Express next middleware function.
   */
  protected abstract handler(req: TypedRequest<unknown, unknown>, res: Response, _next: NextFunction): unknown;

  /**
   * Sends a success response with the provided data and optional metadata.
   *
   * @param res - The Express response object.
   * @param data - The data to be sent in the response.
   * @param meta - Optional metadata to include in the response.
   */
  protected sendSuccess(res: Response, data: unknown, meta: ResponseMeta = {}) {
    res.json(successResponse(data, meta));
  }

  /**
   * Sends an error response with the provided error message and status code.
   *
   * @param res - The Express response object.
   * @param error - The error message to be sent in the response.
   * @param code - The HTTP status code for the error response.
   */
  protected sendError(res: Response, error: string, code: number) {
    res.status(code).json(errorResponse(error, code));
  }
}
export default Controller;
