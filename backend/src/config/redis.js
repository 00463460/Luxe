// Redis Configuration for Caching & Sessions
// To be implemented

import { createClient } from 'redis';

// Railway provides REDIS_URL, fallback to individual params for local dev
const redisConfig = process.env.REDIS_URL
  ? { url: process.env.REDIS_URL }
  : {
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
      }
    };

const redis = createClient(redisConfig);

redis.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

await redis.connect();

export default redis;
