

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

export async function LoggerFunction(ctx, next) {
    try {
        console.log(`From User: ${ctx.from.id}`)
        const start = new Date().getTime();
        // await wait(1000);
        const s = (new Date().getTime() - start) / 1000;
        console.log('Response time: %ss', s)
        next()
    }
    catch (e) {
        console.log('error logger: ', e)
    }
}

