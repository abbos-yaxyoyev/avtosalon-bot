import fp from "fastify-plugin";
import { session } from "telegraf";
import { ENV } from "../../common/config/config";
import { stage } from "../scenes";
import { bot } from "./bot";
import { LoggerFunction } from "./bot-logger";
import { actionController, commandController, herasController, userService } from "./singletons";


async function startBot(instance) {

  try {

    bot.use(async (ctx, next) => await LoggerFunction(ctx, next))
      .use(session())
      .use(stage.middleware())
      .use(async (ctx, next) => {

        ctx.scene.session.proprtyIndex = ctx.scene.session.proprtyIndex ? ctx.scene.session.proprtyIndex : 0;

        let user = await userService.findOne({ id: ctx.from.id, isDeleted: false });

        if (!user) {
          user = await userService.create(ctx.from);
        }

        ctx.user = user;

        if (user.lang) ctx.lang = user.lang;

        next();

      })

    bot.telegram.setMyCommands([
      {
        command: 'start',
        description: "it is help you make post"
      },
      {
        command: 'help',
        description: "bu bot orqali reklama berishda foydalaniladi"
      }
    ])

    /* --- bot command --- */
    bot.command("start", ctx => commandController.start(ctx));

    /* --- bot hears --- */
    bot.hears(/^uz|^ru/, ctx => herasController.language(ctx))
      .hears(/^📋\s.+/, (ctx) => herasController.category(ctx))
      .hears(/^⬅️\s.+/, (ctx) => herasController.backTolanguageMenu(ctx));

    /* --- bot action --- */
    bot.action(/^categoryId__.+/, ctx => actionController.proprty(ctx));

    /* --- bot on --- */
    bot.on("text", (ctx) => { return ctx.reply(ctx.message['text']) })

    await instance.register(require('middie'));

    await instance.use(bot.webhookCallback(`/${ENV.TELEGRAF_TOKEN}`));

    await bot.telegram.setWebhook(`${ENV.WEB_HOOK_URL}/${ENV.TELEGRAF_TOKEN}`);

    bot.catch((err, ctx) => {

      console.error(err);

      ctx.reply("Xatolik bor")

    });

    return await bot.launch();

  }
  catch (error) {
    console.log(error.message)
  }
  console.log('Bot running')
}

async function BotPlugin(instance, _, next) {

  instance.post(`/${ENV.TELEGRAF_TOKEN}`, (_, reply) => {
    reply.send({ root: true })
  })

  await startBot(instance);

  next();

}

export const botPlugin = fp(BotPlugin);

