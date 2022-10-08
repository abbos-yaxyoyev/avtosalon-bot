import { MyContext } from '../core/context';
import { postService } from './../core/singletons';
export class InlineQueryService {

  async inlineQuery(ctx: MyContext) {

    const hashTag = ctx.inlineQuery.query.trim()

    const post = await postService.findOnePost({ isDeleted: false, hashTag });

    if (!post) return;

    let mediaPhotos = [];
    post.photos.forEach((photo_id, index) => {

      if (index == 0) {
        return mediaPhotos.push({
          type: "photo",
          media: photo_id,
          caption: post.postBody,
          parse_mode: "HTML"
        })
      }
      else {
        return mediaPhotos.push({
          type: "photo",
          media: photo_id,
        })
      }
    })

    return await ctx.replyWithMediaGroup(mediaPhotos)

  }

}