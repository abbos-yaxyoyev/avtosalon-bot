import { Scenes } from "telegraf";
import { MyContext } from "../core/context";
import { categoryScenes } from "./category";
import { scenesPhoto, scenesProprty } from "./proprty";

export const stage = new Scenes.Stage<MyContext>([
  categoryScenes, scenesProprty, scenesPhoto
]);
