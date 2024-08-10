import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { NotAuthorizedError, requireAuth } from '@rickjms/microservices-common';
import { RedisClient } from '../redis-client';

const router = express.Router();

// Utility function to format Redis keys
const getUserKey = (id: string) => `user:${id}`;

// Function to fetch a user from the database and cache it in Redis
const fetchUserAndCache = async (userId: string) => {
  const user = await User.findById(userId);
  if (user) {
    const redis = RedisClient.getInstance();
    await redis.set(getUserKey(userId), JSON.stringify(user), 'EX', 3600); // Cache for 1 hour
  }
  return user;
};

/**
 * Route handler for fetching all users.
 *
 * This endpoint requires authentication. It first retrieves the current user's ID from the request,
 * logs it for debugging purposes, then fetches all users from the database. Finally, it sends the
 * list of users back in the response.
 *
 * @route GET /api/users
 * @access Private
 * @param {Request} req - Express request object, containing the current user's session.
 * @param {Response} res - Express response object used to send back the list of users.
 */
router.get('/api/user', requireAuth, async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  // console.log(
  //   `currentUser: ${util.inspect(req.currentUser, false, null, true)}`
  // );
  const userId = req.currentUser!.id;
  console.log(`userId: ${userId}`);
  const users = await User.find({});
  if (!users) {
    res.send([]);
  }
  res.send(users);
});

/**
 * Route handler for fetching a user's details by ID.
 *
 * This endpoint requires authentication. It extracts the user's ID from the request parameters,
 * then fetches the user's details from the database using the provided ID. Finally, it sends the
 * user's details back in the response.
 *
 * @route GET /api/users/:id
 * @access Private
 * @param {Request} req - Express request object, containing the user's ID in the request parameters.
 * @param {Response} res - Express response object used to send back the user data.
 */
router.get(
  '/api/user/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const redis = RedisClient.getInstance();
    const userId = req.params.id;

    // Check Redis for cached user data
    const cachedUser = await redis.get(getUserKey(userId));
    if (cachedUser) {
      console.log('Cache hit: returning user data from Redis');
      return res.send(JSON.parse(cachedUser));
    }

    console.log('Cache miss: fetching user data from the database');
    const user = await fetchUserAndCache(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  }
);

export { router as indexUserRouter };
