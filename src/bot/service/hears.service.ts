import { replyKeyboard } from '../../common/keyboard/keybord';
import { MyContext } from '../core/context';
import { message } from '../message';
import { userService } from './../core/singletons';
import { keyboard } from './../keyboard/index';
export class HearsService {
  // constructor(
  // ) {

  // }

  async language(ctx: MyContext) {

    console.log("context message[text]: ", ctx.message['text']);

    ctx.lang = ctx.message['text'];

    await userService.updateByTgId(ctx.from.id, { lang: ctx.lang })

    return await replyKeyboard(ctx, message.category[ctx.lang], keyboard.category[ctx.lang]);

  }

  async category(ctx: MyContext) {

    console.log("category menu: ", ctx.message['text']);

    return await ctx.scene.enter('categoryScenes');

  }

  backTolanguageMenu(ctx: MyContext) {

    return replyKeyboard(
      ctx,
      message.commandSatart,
      keyboard.language,
      {
        parse_mode: "HTML"
      }
    )

  }


}