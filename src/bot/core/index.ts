import fp from "fastify-plugin";
import { session } from "telegraf";
import { ENV } from "../../common/config/config";
import { replyMessageWithInlineKeyboard } from "../../common/keyboard/keybord";
import { keyboard } from "../keyboard";
import { message } from "../message";
import { stage } from "../scenes";
import { bot } from "./bot";
import { LoggerFunction } from "./bot-logger";
import { actionController, commandController, herasController, userService } from "./singletons";


async function startBot(instance) {

  try {

    bot.use(async (ctx, next) => await LoggerFunction(ctx, next))
      .use(session())
      .use(async (ctx, next) => {

        let user = await userService.findOne({ id: ctx.from.id, isDeleted: false });

        if (!user) {
          user = await userService.create(ctx.from);
        }
        ctx.user = user;

        if (user.lang) ctx.lang = user.lang;

        const member = await bot.telegram.getChatMember(ENV.CHANNEL_ID, ctx.from.id);

        console.log("member: ", member);

        if (!member || member.status == 'left' || member.status == 'kicked') {
          return replyMessageWithInlineKeyboard(
            ctx,
            message.joinToChannel,
            keyboard.channelLink,
            { parse_mode: "HTML" },
            /* remove_keyboard: true */
            true
          );
        }

        next();

      })
      .use(stage.middleware())

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
    bot.hears(/^(🇺🇿|🇷🇺)\s.+/, ctx => herasController.choosenLanguage(ctx))
      .hears(/^📋\s.+/, (ctx) => herasController.choosenCategory(ctx))
      .hears(/^⬅️\s.+/, (ctx) => herasController.backTolanguageMenu(ctx))
      .hears(/^☑️\s.+/, (ctx) => herasController.complitedPost(ctx))
      .hears(/^✅\s.+/, (ctx) => herasController.successPost(ctx))
      .hears(/^⏮\s.+/, (ctx) => herasController.backToCategoryMenu(ctx))
      .hears(/^🔄\s.+/, (ctx) => herasController.resendPhotos(ctx))
      .hears(/^🔙\s.+/, (ctx) => herasController.backToPrevProprty(ctx));

    /* --- bot action --- */
    bot.action(/^start/, ctx => actionController.start(ctx));

    /* --- bot on --- */
    bot.on("text", (ctx) => {
      console.log("text start: ", ctx.message);

      if (ctx.user.categoryId && ctx.user.status == "proprty") return ctx.scene.enter("scenesProprty");
      if (ctx.user.categoryId && ctx.user.status == "photo") return ctx.reply(message.pleaseSendPhoto[ctx.user.lang]);

      return herasController.choosenCategory(ctx);

    })

    /* --- bot photo --- */
    bot.on("photo", (ctx) => {

      if (!ctx.session.photos) ctx.session.photos = [];

      if (ctx.user.status == "photo") {
        return ctx.scene.enter("photo");
      }

    })

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

