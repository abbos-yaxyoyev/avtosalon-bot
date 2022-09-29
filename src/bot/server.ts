import fastify from 'fastify';
import { ENV } from '../common/config/config';
import { dbPlugin } from '../common/db/db';
import { globalErrorDecorator } from '../common/decorators/decorator';
import { botPlugin } from './core';
import { routesPlugin } from './routes';



const server = fastify({ logger: true });

server.register(dbPlugin);
server.register(globalErrorDecorator);
server.register(botPlugin);
server.register(routesPlugin);

async function start() {

  try {
    await server.listen(ENV.PORT, ENV.HOST);
    server.log.info(server.route);
    server.log.info('Started user successfully');
  } catch (error) {

    console.log("server file error: ", error);

  }
}

start();