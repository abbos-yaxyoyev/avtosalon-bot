import { MyContext } from '../core/context';
export class ActionService {
  // constructor(
  // ) {

  // }

  async proprty(ctx: MyContext) {

    console.log("context action callbackQuery: ", ctx.callbackQuery);

    ctx.user.categoryId = ctx.callbackQuery.data.split('__')[1];

    return await ctx.scene.enter('scenesProprty');

  }


}