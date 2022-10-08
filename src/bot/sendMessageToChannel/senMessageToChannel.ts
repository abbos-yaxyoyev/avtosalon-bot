import { bot } from "../core/bot";

export async function sendMessageToChannel(channelId, photos: string[], postBody: string) {

  let photosImgs = [];

  photos.forEach((photo_id, index, arr) => {

    if (index == 0) {
      return photosImgs.push({
        type: "photo",
        media: photo_id,
        caption: postBody,
        parse_mode: "HTML"
      })
    }
    else {
      return photosImgs.push({
        type: "photo",
        media: photo_id,
      })

    }
  })

  return await bot.telegram.sendMediaGroup(channelId, photosImgs);

}