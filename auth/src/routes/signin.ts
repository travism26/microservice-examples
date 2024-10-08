import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import {
  validateRequest,
  BadRequestError,
} from '@rickjms/microservices-common';
import { kafkaWrapper } from '../kafka-wrapper';
import { SystemEventsPublisher } from '../events/systemEventsPublisher';
import client from 'prom-client';
import { metricsRegistry } from './metrics';

const router = express.Router();

const loginCounter = new client.Counter({
  name: 'login_success_total',
  help: 'Total number of successful logins',
  labelNames: ['method'], // Add labels if needed
  registers: [metricsRegistry], // Register with the custom registry
});

// This is where we register the metric with the registry so it can be collected
// register.registerMetric(loginCounter);

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
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      console.log('Invalid credentials');
      throw new BadRequestError('Invalid credentials');
    }
    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    console.log('User signed in and JWT generated');
    try {
      console.log('Publishing user signed in event');
      const systemEventsProducer = kafkaWrapper.getProducer(
        'system-events-producer'
      ) as SystemEventsPublisher;

      // New Schema for user created event (NOT TESTED YET)
      await systemEventsProducer.publish({
        eventId: 'event-' + new Date().getTime(), // Generate a unique event ID
        timestamp: new Date(),
        eventType: 'user_signin',
        userId: existingUser?.id,
        username: existingUser?.email,
        sourceIp: req.ip,
        eventDescription: 'User signed in',
        serviceName: 'auth-service',
        severityLevel: 'INFO',
        applicationVersion: process.env.APP_VERSION || '1.0.0',
        // Optional fields
        additionalMetadata: {
          userAgent: req.get('User-Agent'),
        },
      });
    } catch (err) {
      console.error('Error publishing user signed in event:', err);
    }

    // Increment the login counter
    loginCounter.inc({ method: req.method });

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
