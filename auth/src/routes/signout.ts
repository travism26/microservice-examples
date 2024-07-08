import express from 'express';

const router = express.Router();

router.post('/api/auth/signout', (req, res) => {
  req.session = null;
  console.log('User signed out');
  res.send({});
});

export { router as signoutRouter };
