import request from 'supertest';
import { app } from '../../app';

jest.mock('../../kafka-wrapper');

describe('Signup Route', () => {
  it('should be defined', async () => {
    const response = await request(app).post('/api/auth/signup').send({});
    expect(response.status).not.toBe(404);
  });

  it('should return a 201 on successful signup', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('should return a 400 with an existing email', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('should return a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'testtest.com',
        password: 'password',
      })
      .expect(400);
  });

  it('should return a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);
  });

  it('should set a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
