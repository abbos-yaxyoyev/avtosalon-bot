import { Context, Scenes } from "telegraf";
import { UserInterface } from './../../common/db/models/user/user.interface';
import { CategoryInterface, PostInterface } from "./interfcase";


export interface MyWizardSession extends Scenes.WizardSessionData {
  category: CategoryInterface;
  post: PostInterface;
  proprtyIndex: number;
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {

}


export interface MyContext extends Context {
  lang: string;
  user: UserInterface;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext>
}