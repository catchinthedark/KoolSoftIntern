import { NextFunction, Request, Response, RequestHandler } from "express";
import { ServerError } from '../common/error'
import { failureResponse, serverErrorResponse } from '../common/response';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err instanceof ServerError) {
      const { status, message, data } = err;
      if (status === 200) return failureResponse(res, { message, data });
      return serverErrorResponse(res, status, { message, data });
    }
    console.error('[ERROR]', err);
    return serverErrorResponse(res, 500, { message: 'Internal Server Error' });
  }
  return next();
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  serverErrorResponse(res, 404, { message: `Endpoint ${req.method} ${req.url} not found` });
  return next();
}

type AsyncRequestHandler = (req: Request, res: Response, next?: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
    return (req, res, next) => fn(req, res, next).catch(next);
}