import { replyKeyboard } from '../../common/keyboard/keybord';
import { MyContext } from '../core/context';
import { keyboard } from '../keyboard';
import { message } from '../message';
export class CommandService {
  // constructor(
  // ) {

  // }

  async start(ctx: MyContext) {

    // console.log("start command ctx: ", ctx);

    return replyKeyboard(
      ctx,
      message.commandSatart,
      keyboard.language,
      {
        parse_mode: "HTML"
      }
    )

    return await ctx.scene.enter('categoryWizard');

  }


}