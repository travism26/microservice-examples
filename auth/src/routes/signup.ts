import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@travismtickets/common';
import { User } from '../models/user';
import { kafkaWrapper } from '../kafka-wrapper';
import { SystemEventsPublisher } from '../events/systemEventsPublisher';

const router = express.Router();

router.post(
  '/api/auth/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      // ! is used to tell TS that we have already checked for null
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    console.log('User created and JWT generated');

    try {
      console.log('Publishing user created event');

      const systemEventsProducer = kafkaWrapper.getProducer(
        'system-events-producer'
      ) as SystemEventsPublisher;

      // New Schema for user created event (NOT TESTED YET)
      await systemEventsProducer.publish({
        eventId: 'event-' + new Date().getTime(), // Generate a unique event ID
        timestamp: new Date(),
        eventType: 'user_signup',
        userId: user.id,
        username: user.email, // Assuming username is email
        sourceIp: req.ip,
        eventDescription: 'User created',
        serviceName: 'auth-service',
        severityLevel: 'INFO',
        applicationVersion: process.env.APP_VERSION || '1.0.0',
        // Optional fields
        additionalMetadata: {
          userAgent: req.get('User-Agent'),
        },
      });
    } catch (err) {
      console.error('Error publishing user created event:', err);
    }
    res.status(201).send(user);
  }
);

export { router as signupRouter };
