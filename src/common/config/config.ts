import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});


export const ENV = {
  DB_URL: process.env.DB_URL || `mongodb://localhost:27017/AvtoSalon?directConnection=true`,
  WEB_HOOK_URL: process.env.WEB_HOOK_URL || "https://makepostbot.herokuapp.com",
  TELEGRAF_TOKEN: process.env.TELEGRAF_TOKEN,
  HOST: process.env.HOST || '0.0.0.0',
  CHANNEL_ID: process.env.CHANNEL_ID,
  PORT: process.env.PORT || 3000,
};

export const RedisOptions = {
  url: process.env.REDIS_URL,
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  ttl: parseInt(process.env.REDIS_TTL) || 120,
}
