import { ActionService } from '../service/action.service';
import { MyContext } from './../core/context';

export class ActionController {

  constructor(private readonly actionService: ActionService) { }

  proprty(ctx: MyContext) {
    return this.actionService.proprty(ctx);
  }
}