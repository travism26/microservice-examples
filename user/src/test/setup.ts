import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// Add the mock for the redis client set and get methods
jest.mock('../redis-client');

// global signin function for testing purposes
// this function will create a fake cookie
// and attach it to the request object
// this is to ensure that the test suite is authenticated
// when making requests to protected routes

// an alternative to this we can create a seperate file
// and put this function in there and import it in all the test files
// but this is a better approach as it is a global function
declare global {
  var signin: () => string[];
}

// this is a global function that is called before all tests are run
// it will create a new mongo memory server and connect mongoose to it
// this is to ensure that the test suite is connected to the same database
// as the express app

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// this is a global function that is called before each test
// it will clear all mocks and delete all collections in the database
// this is to ensure that each test is run in isolation
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// this is a global function that is called after all tests are run
// it will stop the mongo memory server and close the mongoose connection
// this is to ensure that the test suite exits properly
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  // this is because the cookie session library will
  // take the data and convert it to base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
