import fp from 'fastify-plugin';
import { categoryRoutes } from './category/routes';


const routes = [
  ...categoryRoutes,
];

export async function pl(instance, _, next) {
  try {
    routes.map((route) => instance.route(route));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  next();
}

export const routesPlugin = fp(pl);
