import express from 'express';

import { currentUser } from '@travismtickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  // if the jwt is not null, we will try to verify it
  // if it is not valid, we will send back null
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
