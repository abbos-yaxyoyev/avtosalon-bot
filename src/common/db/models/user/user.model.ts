import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { COLLECTIONS } from '../../../constant/collections';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.USER,
    timestamps: true,
  },
})
@index(
  {
    id: 1,
  },
  {
    unique: true,
    name: 'tg&id',
    background: true,
    partialFilterExpression: {
      isDeleted: false,
      $type: 'boolean',
    },
  },
)

export class User {

  @prop({ required: true })
  public id: number;

  @prop({})
  public lang: string;

  @prop({ trim: true })
  public phone_number: string;

  @prop({ default: false })
  public is_bot: boolean;

  @prop({ trim: true })
  public first_name: string;

  @prop({ trim: true })
  public language_code?: string;

  @prop({ trim: true })
  public username?: string;

  @prop({ default: false })
  public isDeleted: boolean;

  @prop({ default: false })
  public isEmployee: boolean;


  /* --- category proprty --- */
  /* --- use scenes withard --- */

  @prop({ default: null })
  proprtyIndex: number;

  @prop({ default: null })
  categoryId: string;

  @prop({ default: null })
  scenesWizard: string;

}

export const UserModel = getModelForClass(User);
