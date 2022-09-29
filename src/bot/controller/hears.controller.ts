import { MyContext } from '../core/context';
import { HearsService } from '../service/hears.service';

export class HearsController {
  constructor(private readonly hearsService: HearsService) { }

  /* --- Choose language --- */
  language(ctx: MyContext) {
    return this.hearsService.language(ctx);
  }

  /* --- category menu --- */
  category(ctx: MyContext) {
    return this.hearsService.category(ctx);
  }

  /* --- back language menu --- */
  backTolanguageMenu(ctx: MyContext) {
    return this.hearsService.backTolanguageMenu(ctx);
  }

}