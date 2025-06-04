import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to extract 'x-locale' header from incoming requests
 * and store it in `req.locale` for global access within the request lifecycle.
 */
export function localeMiddleware(req: Request, res: Response, next: NextFunction) {
  req['locale'] = req.headers['x-locale']?.toString();
  next();
}
