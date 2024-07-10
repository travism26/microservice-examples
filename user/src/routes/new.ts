import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { requireAuth } from '@travismtickets/common';

const router = express.Router();

router.post('/api/user', requireAuth, async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  const email = req.currentUser!.email;
  const user = User.build({ email, firstName, lastName });
  await user.save();

  res.status(201).send(user);
});

export { router as newUserRouter };
