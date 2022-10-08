import { ActionService } from '../service/action.service';
import { MyContext } from './../core/context';

export class ActionController {

  constructor(private readonly actionService: ActionService) { }

  start(ctx: MyContext) {
    return this.actionService.start(ctx);
  }
}