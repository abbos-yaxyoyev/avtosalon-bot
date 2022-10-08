import { Scenes } from "telegraf";
import { replyKeyboard } from "../../common/keyboard/keybord";
import { MyContext } from '../core/context';
import { categoryService } from '../core/singletons';
import { message } from "../message";


export const categoryScenes = new Scenes.BaseScene<MyContext>("categoryScenes");

categoryScenes.enter(async (ctx) => {

  const categoriesMenuKeyboard = await categoryService.makeCategoryMenu(ctx);

  replyKeyboard(
    ctx,
    message.chooseCategory[ctx.lang],
    categoriesMenuKeyboard,
    { parse_mode: "HTML", }
  );

  return ctx.scene.leave();

})

