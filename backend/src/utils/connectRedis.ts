require('dotenv').config();

import config from 'config';
import { createClient } from 'redis';

const redisUrl = config.get<string>('redisUrl');

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
