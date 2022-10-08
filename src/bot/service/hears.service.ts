import { replyKeyboard } from '../../common/keyboard/keybord';
import { MyContext } from '../core/context';
import { message } from '../message';
import { sendMessageToChannel } from '../sendMessageToChannel/senMessageToChannel';
import { ENV } from './../../common/config/config';
import { categoryService, postService, userService } from './../core/singletons';
import { keyboard } from './../keyboard/index';
export class HearsService {

  async choosenLanguage(ctx: MyContext) {

    const lang = ctx.message['text'].trim().slice(4).trim();

    ctx.lang = 'uz';

    if (lang == "Русский") {
      ctx.lang = 'ru';
    }

    ctx.user.lang = ctx.lang
    await userService.updateByTgId(ctx.from.id, { lang: ctx.lang })

    return await ctx.scene.enter('categoryScenes');

  }

  async choosenCategory(ctx: MyContext) {

    console.log("ctx.message.text: ", ctx.message["text"]);

    let categoryName = ctx.message["text"].trim().slice(3).trim();

    console.log("categoryName: ", categoryName);

    let category = await categoryService.findCategoryByName(categoryName, ctx.user.lang);

    if (!category) return ctx.reply(message.notCategory[ctx.user.lang])

    ctx.user.categoryId = category._id.toString();
    ctx.user.proprtyIndex = 0;

    const postData = {
      categoryId: ctx.user.categoryId,
      userTgId: ctx.from.id,
      createdBy: ctx.user._id
    }

    const post = await postService.createPost(postData)

    await userService.updateByTgId(
      ctx.from.id,
      {
        categoryId: ctx.user.categoryId,
        proprtyIndex: 0,
        status: "proprty",
        postId: post._id,
        isNextProprty: true
      }
    );

    ctx.user.postId = post._id;
    ctx.user.isNextProprty = true;

    return await ctx.scene.enter('scenesProprty');

  }

  async backTolanguageMenu(ctx: MyContext) {

    return replyKeyboard(
      ctx,
      message.commandStart,
      keyboard.language,
      {
        parse_mode: "HTML"
      }
    )

  }

  async successPost(ctx: MyContext) {

    ctx.session.photos = [];

    ctx.user.status = null;

    await userService.updateByTgId(ctx.from.id, { status: null, categoryId: null });

    const post = await postService.findOne({ isDeleted: false, _id: ctx.user.postId })

    await sendMessageToChannel(ENV.CHANNEL_ID, post.photos, post.postBody)

    const categoriesMenuKeyboard = await categoryService.makeCategoryMenu(ctx);

    return replyKeyboard(
      ctx,
      message.postSuccess[ctx.user.lang],
      categoriesMenuKeyboard,
      { parse_mode: "HTML", }
    );

  }

  async backToCategoryMenu(ctx: MyContext) {

    ctx.session.photos = [];

    await ctx.scene.enter('categoryScenes');

    await userService.updateByTgId(ctx.from.id, { status: null, categoryId: null, postId: null });

    return await postService.deletePost(ctx.user.postId.toString());

  }

  async resendPhotos(ctx: MyContext) {

    ctx.session.photos = [];

    ctx.session.media_group_id = null;

    await userService.updateByTgId(ctx.from.id, { status: "photo", photos: null });

    return ctx.reply(message.resendPhoto[ctx.lang]);

  }

  async backToPrevProprty(ctx: MyContext) {

    const post = await postService.findOne({ _id: ctx.user.postId, isDeleted: false });

    if (post.proprties.length == 0 && ctx.user.status == "proprty") {

      await userService.updateByTgId(ctx.from.id, { status: null });

      await postService.updatePost(ctx.user.postId.toString(), { proprties: [] });

      return await ctx.scene.enter('categoryScenes');

    }

    post.proprties.pop();

    console.log("post.proprties1: ", post.proprties);

    await postService.updatePost(ctx.user.postId.toString(), { proprties: post.proprties });

    const category = (await categoryService.getCategoryById(ctx.user.categoryId)).shift();

    if (!category) {
      return ctx.reply(message.notCategory[ctx.lang]);
    }

    /* ---  ---  --- Check prev or next ---  ---  --- */
    if (ctx.user.isNextProprty) {
      ctx.user.proprtyIndex -= 1;
      console.log("post.proprties2: ", post.proprties);
      await postService.updatePost(ctx.user.postId.toString(), { proprties: post.proprties });
      await userService.updateByTgId(ctx.from.id, { $inc: { proprtyIndex: -1 }, isNextProprty: false });
    }
    /* ---  ---  ---  ---  ---  ---  ---  ---  --- */

    await userService.updateByTgId(ctx.from.id, { $inc: { proprtyIndex: -1 }, isNextProprty: false });
    const proprtyIndex = ctx.user.proprtyIndex - 1;
    const proprties = category.proprties;

    const msg = `<b>${proprties[proprtyIndex].field[ctx.user.lang]}</b> \n\n${proprties[proprtyIndex].description[ctx.user.lang]}`;

    return replyKeyboard(
      ctx,
      msg,
      keyboard.progressSetProprty[ctx.user.lang],
      { parse_mode: "HTML" }
    );

  }

}