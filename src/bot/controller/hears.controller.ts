import { MyContext } from '../core/context';
import { HearsService } from '../service/hears.service';

export class HearsController {
  constructor(private readonly hearsService: HearsService) { }

  /* --- Choose language --- */
  choosenLanguage(ctx: MyContext) {
    return this.hearsService.choosenLanguage(ctx);
  }

  /* --- Category menu --- */
  choosenCategory(ctx: MyContext) {
    return this.hearsService.choosenCategory(ctx);
  }

  /* --- Back language menu --- */
  backTolanguageMenu(ctx: MyContext) {
    return this.hearsService.backTolanguageMenu(ctx);
  }

  /* --- Success Post --- */
  successPost(ctx: MyContext) {
    return this.hearsService.successPost(ctx)
  }

  /* --- ⏮ back to category menu --- */
  backToCategoryMenu(ctx: MyContext) {
    return this.hearsService.backToCategoryMenu(ctx)
  }

  /* --- Resend Photos --- */
  resendPhotos(ctx: MyContext) {
    return this.hearsService.resendPhotos(ctx);
  }

  /* --- back before proprty --- */
  backToPrevProprty(ctx: MyContext) {
    return this.hearsService.backToPrevProprty(ctx)
  }

}