import { Telegraf } from "telegraf";
import { ENV } from "../../common/config/config";
import { MyContext } from "./context";

export const bot = new Telegraf<MyContext>(ENV.TELEGRAF_TOKEN);
