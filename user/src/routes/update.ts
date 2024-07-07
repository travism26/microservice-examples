import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { NotAuthorizedError, requireAuth } from '@travismtickets/common';
import { NotFoundError } from '@travismtickets/common';

const router = express.Router();

router.put(
  '/api/users/:id',
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
  ],
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;

    // to speed up dev putting model access in the route handler
    // otherwise, we could have a service that handles this to abstract the model access
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError();
    }

    if (user.id !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // Update the user's first and last name
    user.set({
      firstName,
      lastName,
    });

    await user.save();
    // Maybe send a message to the kafka broker here?
    res.send(user);
  }
);
