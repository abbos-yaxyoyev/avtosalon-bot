import { Scenes } from "telegraf";
import { COLLECTIONS } from '../../common/constant/collections';
import { CounterModel } from '../../common/db/models/counter/counter.model';
import { replyKeyboard } from '../../common/keyboard/keybord';
import { MyContext } from '../core/context';
import { categoryService, postService, userService } from '../core/singletons';
import { keyboard } from '../keyboard';
import { message } from "../message";
import { PostInterface } from './../core/interfcase';

/* --- Enter Category --- */
export const scenesProprty = new Scenes.BaseScene<MyContext>("scenesProprty");

scenesProprty.enter(async (ctx: MyContext) => {

  if (!ctx.user) return ctx.scene.leave();

  const category = await categoryService.findCategoryById(ctx.user.categoryId);
  if (!category) {
    return ctx.reply(message.notCategory[ctx.lang]);
  }

  const post = await postService.findById(ctx.user.postId);
  if (!post) {
    return await ctx.scene.enter('categoryScenes');
  }

  /* ---  ---  --- Check prev or next ---  ---  --- */
  if (!ctx.user.isNextProprty) {
    ctx.user.proprtyIndex += 1;
    await userService.updateByTgId(ctx.from.id, { $inc: { proprtyIndex: 1 }, isNextProprty: true });
  }
  /* ---  ---  ---  ---  ---  ---  ---  ---  --- */

  await userService.updateByTgId(ctx.from.id, { $inc: { proprtyIndex: 1 }, isNextProprty: true });

  const categoryProprties = category.proprties;

  if (ctx.user.proprtyIndex > 0) {

    const proprty = {
      field: categoryProprties[ctx.user.proprtyIndex - 1].field[ctx.user.lang],
      value: ctx.message["text"]
    }

    await postService.updatePost(ctx.user.postId.toString(), { $push: { proprties: proprty } });

  }

  if (categoryProprties.length <= ctx.user.proprtyIndex) {
    await userService.updateByTgId(ctx.from.id, { proprtyIndex: 0, status: "photo", isNextProprty: null });
    return replyKeyboard(
      ctx,
      message.photoLimit(ctx, category.maxImgAllowed),
      keyboard.backToCategoryMenuOrComplitedPost[ctx.user.lang]
    )
  }

  const msg = `<b>${categoryProprties[ctx.user.proprtyIndex].field[ctx.user.lang]}</b> \n\n${categoryProprties[ctx.user.proprtyIndex].description[ctx.user.lang]}`;

  replyKeyboard(
    ctx,
    msg,
    keyboard.progressSetProprty[ctx.user.lang],
    { parse_mode: "HTML" }
  );

  return ctx.scene.leave();

});




/* --- Enter Photo --- */
export const scenesPhoto = new Scenes.BaseScene<MyContext>("photo");

scenesPhoto.enter(async (ctx) => {

  /* --- check category max allaowed img count --- */
  const category = await categoryService.findCategoryById(ctx.user.categoryId);
  if (category.maxImgAllowed <= ctx.session.photos.length) {
    return ctx.reply(message.photoLimitFinish(ctx, category.maxImgAllowed))
  }

  if ('photo' in ctx.message) {

    let photo = ctx.message.photo;
    let height = photo[0].height;
    let index = 0;

    for (let i = 1; i < photo.length; i++) {
      if (height < photo[i].height) {
        height = photo[i].height;
        index = i;
      }
    }

    if (ctx.session.media_group_id && (ctx.session.media_group_id != ctx.message.media_group_id)) {
      ctx.session.photos = [];
    }
    ctx.session.photos.push(ctx.message.photo[index].file_id);

  }

  if (category.maxImgAllowed <= ctx.session.photos.length) {

    const post = await postService.findOne({ isDeleted: false, _id: ctx.user.postId });

    await sendCompletedPost(ctx, ctx.session.photos, post);

    return replyKeyboard(ctx, message.complitedPostWiev[ctx.user.lang], keyboard.successPostBackResetPhoto[ctx.user.lang]);

  }

})

export async function sendCompletedPost(ctx: MyContext, photos: string[], post: PostInterface) {

  let postBody = '';

  post.proprties.forEach((data,) => {
    postBody += `<b>${data.field}</b>:\t\t ${data.value}\n`;
  })

  const hashTag = 'T' + (await CounterModel.getValue(COLLECTIONS.CATEGORY)).toString();

  postBody = `${message.hashTag[ctx.user.lang]} #${hashTag}\n\n${postBody}\n\n${message.linkForBotAndChannel}`;

  let photosImgs = [];

  photos.forEach((field_id, index, arr) => {

    if (index == 0) {
      return photosImgs.push({
        type: "photo",
        media: field_id,
        caption: postBody,
        parse_mode: "HTML"
      })
    }
    else {
      return photosImgs.push({
        type: "photo",
        media: field_id,
      })

    }
  })

  ctx.replyWithMediaGroup(photosImgs);


  await postService.updatePost(
    ctx.user.postId.toString(),
    {
      imgCount: ctx.session.photos.length,
      photos: ctx.session.photos,
      isAvailable: true,
      postBody,
      hashTag
    }
  );


}