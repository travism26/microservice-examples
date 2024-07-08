import request from 'supertest';
import { app } from '../../app';

describe('Signin Route', () => {
  it('should be defined', async () => {
    const response = await request(app).post('/api/auth/signin').send({});
    expect(response.status).not.toBe(404);
  });

  it('should return a 200 on successful signin', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('should fail when an email that does not exist is supplied', async () => {
    await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('should fail when an incorrect password is supplied', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'test@test.com',
        password: 'wrongpassword',
      })
      .expect(400);
  });
});
