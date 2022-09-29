import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../constant/collections';
import { User } from '../user/user.model';

class FieldLanguage {

  @prop({ required: true, trim: true })
  uz: string;

  @prop({ required: true, trim: true })
  ru: string;

}

class Proprty {

  @prop({ required: true, type: FieldLanguage })
  field: FieldLanguage;

  @prop({ trim: true })
  validate_type: string;

  @prop({})
  position?: number;

  @prop({ default: false })
  public isRequired: boolean;

  @prop({ required: true })
  public description: FieldLanguage;

}

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.CATEGORY,
    timestamps: true,
  },
})

@index(
  {
    name: 1,
    parentId: 1
  },
  {
    name: 'name&parentId',
    background: true,
  },
)

@index(
  {
    name: 1,
    tags: 1,
    isDeleted: 1,
    parentId: 1,
    proprties: 1,
    createdBy: 1,
  },
  {
    unique: true,
    name: 'name&parentId',
    background: true,
    partialFilterExpression: {
      isDeleted: false,
      $type: 'boolean',
    },
  },
)


export class Category {

  @prop({ type: Types.ObjectId, ref: COLLECTIONS.CATEGORY })
  parentId?: Ref<Category>;

  //! employee mongodb _id
  @prop({ type: Types.ObjectId, ref: COLLECTIONS.USER })
  createdBy: Ref<User>;

  //! employee telegram id
  @prop({})
  userTgId: number;

  @prop({ required: true })
  public name: FieldLanguage;

  @prop({ required: true, min: 0 })
  maxImgAllowed: number;

  @prop({ default: false })
  public isAvailable: boolean;

  @prop({ required: true, type: [String] })
  public tags: string[];

  @prop({ default: false })
  public isDeleted: boolean;

  @prop({ required: true, type: [Proprty] })
  public proprties: Proprty[];

}

export const CategoryModel = getModelForClass(Category);
