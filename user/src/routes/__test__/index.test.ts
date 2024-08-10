import request from 'supertest';
import { app } from '../../app';

const createUser = async (email: String) => {
  const cookie = global.signin();
  return request(app)
    .post('/api/user')
    .set('Cookie', cookie)
    .send({ email, firstName: 'Test', lastName: 'User' });
};

it('returns a 201 on successful signup', async () => {
  await createUser('travis1@test.com');
  await createUser('travis2@test.com');
  await createUser('travis3@test.com');

  const response = await request(app)
    .get('/api/user')
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
  await request(app).get('/api/user').send().expect(401);
});

it('returns a 200 on fetching user', async () => {
  const user = await createUser('test@test.com');

  const response = await request(app)
    .get(`/api/user/${user.body.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(200);

  expect(response.body.email).toEqual('test@test.com');
});
