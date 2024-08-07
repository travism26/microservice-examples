import request from 'supertest';
import { app } from '../../app';

// supertest does not handle cookies automatically
// so we need to manually extract the cookie from the response
// and then pass it to the subsequent requests
it('responds with details about the current user', async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get('/api/auth/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/auth/currentuser')
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(undefined);
});
