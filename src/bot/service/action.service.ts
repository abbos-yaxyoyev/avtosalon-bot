import { replyKeyboard } from '../../common/keyboard/keybord';
import { MyContext } from '../core/context';
import { keyboard } from '../keyboard';
import { message } from '../message';
export class ActionService {

  async start(ctx: MyContext) {

    return replyKeyboard(
      ctx,
      message.commandStart,
      keyboard.language,
      {
        parse_mode: "HTML"
      }
    )

  }


}