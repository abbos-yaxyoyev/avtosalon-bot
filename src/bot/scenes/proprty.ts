import { Scenes } from "telegraf";
import { replyKeyboard } from "../../common/keyboard/keybord";
import { MyContext } from '../core/context';
import { categoryService, userService } from '../core/singletons';
import { keyboard } from "../keyboard";
import { message } from "../message";

/* --- Enter Category --- */
export const scenesProprty = new Scenes.BaseScene<MyContext>("scenesProprty");

scenesProprty.enter(async (ctx) => {

  if (!ctx.user) return ctx.scene.leave();

  const id = ctx.user.categoryId;

  const data = (await categoryService.getCategoryById(id)).shift();

  if (!data) return ctx.reply("Bizda bunday ma'lumotdagi category topilmadi")

  ctx.scene.session.category = data;

  const proprties = ctx.scene.session.category.proprties;

  const proprtyIndex = ctx.user.proprtyIndex;

  if (proprties.length <= proprtyIndex) {

    await userService.updateByTgId(ctx.from.id, { categoryId: null, proprtyIndex: 0, status: null });

    return ctx.scene.leave();

  }

  const msg = `<b>${proprties[proprtyIndex].field[ctx.user.lang]}</b> \n\n<b>${proprties[proprtyIndex].description[ctx.user.lang]}</b>`;

  ctx.reply(msg, { parse_mode: "HTML" });

  await userService.updateByTgId(ctx.from.id, { proprtyIndex: proprtyIndex + 1 });

  return ctx.scene.reenter();

});

scenesProprty.leave(async (ctx) => {
  return await replyKeyboard(ctx, message.category[ctx.lang], keyboard.category[ctx.lang]);
})