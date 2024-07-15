export const kafkaWrapper = {
  getProducer: jest.fn().mockImplementation(() => {
    return {
      publish: jest.fn().mockResolvedValue(null),
    };
  }),
  getConsumer: jest.fn().mockImplementation(() => {
    return {
      subscribe: jest.fn().mockResolvedValue(null),
      run: jest.fn().mockResolvedValue(null),
    };
  }),
};
