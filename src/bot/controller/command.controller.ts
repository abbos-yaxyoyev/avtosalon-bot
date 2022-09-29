import { CommandService } from '../service/command.service';
import { MyContext } from './../core/context';

export class CommandController {
  constructor(private readonly commandService: CommandService) { }
  start(ctx: MyContext) {
    return this.commandService.start(ctx);
  }
}