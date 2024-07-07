import request from 'supertest';
import { app } from '../../app';
import e from 'express';

const createUser = async (email: String) => {
  const cookie = global.signin();
  return request(app)
    .post('/api/users')
    .set('Cookie', cookie)
    .send({ email, firstName: 'Test', lastName: 'User' });
};

it('returns a 201 on successful signup', async () => {
  await createUser('travis1@test.com');
  await createUser('travis2@test.com');
  await createUser('travis3@test.com');

  const response = await request(app)
    .get('/api/users')
    .set('Cookie', global.signin())
    .send()
    .expect(200);
  const util = require('util');
  console.log(
    util.inspect(response.body, false, null, true /* enable colors */)
  );
  expect(response.body.length).toEqual(3);
  expect(response.status).toEqual(200);
});

it('returns a 401 if not authenticated', async () => {
  await request(app).get('/api/users').send().expect(401);
});
