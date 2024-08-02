import express from 'express';

import { currentUser } from '@rickjms/microservices-common';

const router = express.Router();

router.get('/api/auth/currentuser', currentUser, (req, res) => {
  // if the jwt is not null, we will try to verify it
  // if it is not valid, we will send back null
  console.log('req.currentUser', req.currentUser);
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
