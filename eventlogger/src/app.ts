import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@travismtickets/common';

// cert error type in google: thisisunsafe
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);

// app.use(currentUser) ensures that the current user is set on the request object
// this is to ensure that the current user is available to all routes.
app.use(currentUser);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
