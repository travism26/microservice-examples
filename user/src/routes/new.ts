import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { requireAuth } from '@travismtickets/common';

const router = express.Router();

router.post('/api/users', requireAuth, async (req: Request, res: Response) => {
  const { email, firstName, lastName } = req.body;

  const user = User.build({ email, firstName, lastName });
  await user.save();

  res.status(201).send(user);
});

export { router as newUserRouter };
