import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { ENV } from './../config/config';

async function connect() {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(ENV.DB_URL);
    console.log('db success connected');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

async function pl(instance, options, next) {
  connect();
  next();
}

export const dbPlugin = fp(pl);
