export const kafkaWrapper = {
  getProducer: jest.fn().mockImplementation((producerName) => {
    console.log('Mocked Producer found for:', producerName);
    return {
      publish: jest.fn().mockImplementation(({}) => {
        console.log('Mocked Producer publish');
      }),
    };
  }),
  getConsumer: jest.fn().mockImplementation(() => {
    console.log('Mocked Consumer found');
    return {
      subscribe: jest.fn().mockResolvedValue(null),
      run: jest.fn().mockResolvedValue(null),
    };
  }),
};
