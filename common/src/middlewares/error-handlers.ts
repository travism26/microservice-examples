import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Goal is to alway send back a consistent error object so react doesnt need to
  // figuare out what type of error its handling, 1 simple error accross all errors

  // This return object is what needs to be consistent
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error('error-handlers: ', err);
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};
