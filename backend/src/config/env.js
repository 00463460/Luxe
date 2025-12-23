// Environment Configuration
import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || 'ecom_db',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD,
  
  // Redis
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  
  // API Keys
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  
  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
};
