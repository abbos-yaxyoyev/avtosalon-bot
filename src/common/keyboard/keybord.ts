import { Markup } from 'telegraf'; // Module to use Telegraf API.
import { MessageEntity } from 'telegraf/typings/core/types/typegram';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { MyContext } from '../../bot/core/context';

//! keybord
export async function replyKeyboard(ctx: MyContext, message: string, keyboards = [], options: any = null) {
    ctx.reply(
        message,
        {
            // reply_markup: Markup.keyboard(keyboards).oneTime().resize().reply_markup,
            reply_markup: {
                resize_keyboard: true,
                keyboard: keyboards
            },
            ...options
        }
    )
}

export async function replyMessageWithInlineKeyboard(
    ctx: MyContext,
    message: string,
    keyboards = [],
    options: ExtraReplyMessage = {}
) {

    if (keyboards.length) {
        options.reply_markup = {
            resize_keyboard: true,
            inline_keyboard: keyboards
        }
    }

    for (const key in options) {
        if (!options[key]) {
            delete options[key]
        }
    }

    await ctx.reply(message, options);

}

export async function replyWithMedia(
    ctx: MyContext,
    type: string,
    file_id: string,
    keyboards: string[][][] = [],
    options: {
        caption?: string
        caption_entities?: MessageEntity[],
        reply_markup?: any
    },
) {

    let inlineKeyboards: any[];

    for (const key in options) {
        if (!options[key]) {
            delete options[key]
        }
    }

    if (keyboards.length) {
        inlineKeyboards = keyboards.map((elem) => elem.map((val) => Markup.button.url(val[0], val[1])))
        options.reply_markup = Markup.inlineKeyboard(inlineKeyboards).reply_markup
    }

    switch (type) {
        case 'video':
            return await ctx.replyWithVideo(file_id, options)
            break;
        case 'photo':
            return await ctx.replyWithPhoto(file_id, options)
            break;
        case 'gif':
            return await ctx.replyWithAnimation(file_id, options)
            break;
    }

}
