import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@travismtickets/common';
import { kafkaWrapper } from '../kafka-wrapper';
import { SystemEventsPublisher } from '../events/systemEventsPublisher';

const router = express.Router();

router.post(
  '/api/auth/signin',

  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
      //   return res.status(400).send({
      //     errors: [{ message: 'Invalid credentials' }],
      //   });
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      // ! is used to tell TS that we have already checked for null
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    console.log('User signed in and JWT generated');

    console.log('Publishing user signed in event');
    const systemEventsPublisher = new SystemEventsPublisher(
      kafkaWrapper.getClient()
    ).publish({
      id: existingUser.id,
      timestamp: new Date(),
      details: 'User signed in',
    });
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
