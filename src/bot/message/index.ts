import { MyContext } from './../core/context';
export const message = {

  joinToChannel: `Iltimos botdan foydalanishdan oldin bizing kanalga a'zo bo'ling. A'zo bo'lganingizdan keyin <b>Start</b> tugmasini bosing!!!\n\nПожалуйста, подпишитесь на наш канал перед использованием бота. Став участником, нажмите <b>Start</b>!!!`,

  commandStart: `<b>O'zbek</b>: Xushkelibsiz !!! \nTilni tanlang\n\n<b>Русский</b>: Добро пожаловать !!! \nВыберите язык\n`,

  chooseCategory: {
    uz: "Quydagi kategoryalardan o'zingizga kerakligini tanlang  👇",
    ru: "Выберите то, что вам нужно из категорий ниже 👇"
  },

  category: {
    uz: "Kategoryalar bo'limiga o'tish uchun kategory tugmasini bposing.",
    ru: "Нажмите кнопку категории, чтобы перейти в раздел категорий."
  },

  notCategory: {
    uz: "Bizda bunday ma'lumotdagi category topilmadi.",
    ru: "Мы не нашли категорию с этой информацией."
  },

  photoLimit(ctx: MyContext, maxImgAllowed) {
    if (ctx.lang === "uz")
      return `Ko'pi bilan ${maxImgAllowed} ta rasm yuborishingiz mumkun.`
    else
      return `Вы можете отправить до ${maxImgAllowed} фотографий с копией.`
  },

  linkForBotAndChannel: `<a href="http://instagram.com/tashavtolider">Instagram</a> | <a href="https://t.me/Tashavto_lider">Telegram</a>\n\n`,

  photoLimitFinish(ctx: MyContext, maxImgAllowed: number) {
    if (ctx.lang === "uz")
      return `Siz ${maxImgAllowed} ta rasm yuborib bo'ldingiz.`
    else
      return `Вы отправили ${maxImgAllowed} изображений.`
  },

  complitedPostWiev: {
    uz: `E'loningizni taxminiy ko'rinishi tayyor bo'ldi. E'loningiz xato bo'lmasa e'lonni tasdiqlashingiz,  rasmlarini qaytadan yuborishingiz  yoki e'lonni bekor qilishingiz mumkun .`,
    ru: `Предварительный просмотр вашего объявления готов. Если ваше объявление правильное, вы можете подтвердить объявление, повторно отправить фотографии или отменить объявление.`
  },

  postSuccess: {
    uz: "Sizning e'loningizni 24 soat vaqt oralig'ida adminlarimiz ko'rib  chiqib joylaniladi.\n\n<del>  15000  so'm</del>\n<b>  Tekin</b>",
    ru: "Ваше объявление будет рассмотрено нашими администраторами и опубликовано в течение 24 часов.<del>  15000 сум</del>\n<b>  Бесплатно</b>"
  },

  resendPhoto: {
    uz: "Rasmni qaytadan yuborishingiz mumkun",
    ru: "Вы можете повторно отправить изображение"
  },

  postNotFound: {
    uz: "E'lonni topa olmadik iltimos boshqatdan harakat qilib ko'ring.",
    ru: "Не удалось найти объявление, попробуйте еще раз."
  },

  pleaseSendPhoto: {
    uz: "Iltimos e'lon uchun rasm yuboring yoki e'lonni bekor qiling",
    ru: "Пожалуйста, отправьте фото для объявления или отмените объявление."
  },

  hashTag: {
    uz: "E'lon kodi:  ",
    ru: "Промо-код:  "
  }

}