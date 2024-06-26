import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// modify the existing Request interface
// by adding the currentUser property to it
// and assign it the value of the UserPayload interface
// we are doing this so that we can use the currentUser property
// in other middlewares
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the jwt is not null, we will try to verify it
  // if it is not valid, we will send back null
  // if it is valid, we will send back the payload
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    // we are going to modify the existing req object
    // by adding the currentUser property to it
    // and assign it the value of the payload
    // we are doing this so that we can use the currentUser property
    // in other middlewares
    req.currentUser = payload;
  } catch (err) {
    res.send({ currentUser: null });
  }

  next();
};
