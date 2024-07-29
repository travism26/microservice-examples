import Redis from 'ioredis';

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      const redisHost = process.env.REDIS_HOST || 'localhost';
      RedisClient.instance = new Redis({
        host: redisHost,
      });
      RedisClient.instance.on('error', (err) => {
        console.error('Redis connection error:', err);
      });
    }
    return RedisClient.instance;
  }

  public static async disconnect() {
    if (RedisClient.instance) {
      await RedisClient.instance.quit();
    }
  }
}

export { RedisClient };
