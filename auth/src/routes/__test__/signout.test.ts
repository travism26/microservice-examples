import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/auth/signout')
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
