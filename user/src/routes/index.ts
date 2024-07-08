import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { NotAuthorizedError, requireAuth } from '@travismtickets/common';

const router = express.Router();

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
  const userId = req.currentUser!.id;
  console.log(`userId: ${userId}`);
  const users = await User.find({});
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
    const user = await User.findById(req.params.id);
    res.send(user);
  }
);

export { router as indexUserRouter };
