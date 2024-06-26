import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

// We are assuming that the currentUser property
// will be added to the Request interface
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the currentUser property is not defined
  // we will throw an error
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
