import fp from 'fastify-plugin';

async function pl(instance, options, next) {
  instance.decorateReply('success', function (result: any = 'ok') {
    this.status(200).send({
      statusCode: 200,
      code: 0,
      message: 'Success',
      data: result,
    });
  });

  // global error handler
  instance.setErrorHandler((error, request, reply) => {
    console.log("request: ", request);
    console.log("reply: ", reply);
    console.log("error: ", error);
  });

  next();
}

export const globalErrorDecorator = fp(pl);
