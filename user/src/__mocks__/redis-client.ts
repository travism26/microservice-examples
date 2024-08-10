import { set } from 'mongoose';

// This is similar to the mock for the kafka-wrapper module
// Notes for my future self:
// 1. In the routes file, we import the RedisClient class from the redis-client module.
// 2. I created a RedisClient object with a getInstance method that returns an object with get and set methods.
//      - This is why I have the getInstance method in the RedisClient object below.
// 3. The get and set methods are mocked using jest.fn() on the RedisClient object.
export const RedisClient = {
  getInstance: jest.fn().mockImplementation(() => {
    console.log('Mocked getInstance');
    return {
      get: jest.fn().mockImplementation(({}) => {
        console.log('Mocked Producer publish');
      }),
      set: jest.fn().mockImplementation(({}) => {
        console.log('Mocked Producer publish');
      }),
    };
  }),
};
