import { Request, Response, NextFunction } from 'express';

/**
 * normalizeRequestMiddleware
 * - Trims all string values in the request body and query parameters
 * - Handles strings and arrays of strings in query params
 * - Ensures consistent input formatting across the app
 */
export function normalizeRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  const trim = (value: any): typeof value => {
    if (typeof value === 'string') return value.trim();
    if (Array.isArray(value)) return value.map((v) => (typeof v === 'string' ? v.trim() : v));
    return value;
  };

  // Trim strings in request body
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      const value = req.body[key];
      if (typeof value === 'string') {
        req.body[key] = value.trim();
      }
    }
  }

  // Trim strings and string arrays in query parameters
  if (req.query && typeof req.query === 'object') {
    for (const key in req.query) {
      req.query[key] = trim(req.query[key]);
    }
  }

  next();
}
