import { Scenes } from "telegraf";
import { replyMessageWithInlineKeyboard } from "../../common/keyboard/keybord";
import { MyContext } from '../core/context';
import { categoryService } from '../core/singletons';
import { message } from "../message";



export const categoryScenes = new Scenes.BaseScene<MyContext>("categoryScenes");

categoryScenes.enter(async (ctx) => {

  const data = await categoryService.categoryPaging();

  console.log("ctx.lang: ", ctx.lang);

  const inlineKeybard = data.map((data) => {
    return [
      { text: data.name[ctx.lang], callback_data: "categoryId__" + data._id },
    ]
  })

  console.log("category inlineKeybard: ", inlineKeybard);

  replyMessageWithInlineKeyboard(
    ctx,
    message.chooseCategory[ctx.lang],
    inlineKeybard,
    {
      parse_mode: "HTML"
    }
  );

  return ctx.scene.leave();

})

