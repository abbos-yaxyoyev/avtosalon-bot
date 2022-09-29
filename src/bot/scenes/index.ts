import { Scenes } from "telegraf";
import { MyContext } from "../core/context";
import { categoryScenes } from "./category";
import { scenesProprty } from "./proprty";

export const stage = new Scenes.Stage<MyContext>([
  categoryScenes, scenesProprty
]);
