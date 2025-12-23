// Redis Configuration for Caching & Sessions
// To be implemented

import { createClient } from 'redis';

const redis = createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

redis.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

await redis.connect();

export default redis;
