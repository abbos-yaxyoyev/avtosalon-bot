import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../constant/collections';
import { Category } from '../category/category.model';
import { User } from '../user/user.model';


export enum Status {
  proprty = "proprty",
  photo = "photo",
}


export class ProprtyValue {

  /* --- kerakli --- */
  _id?: any;

  @prop({ trim: true })
  field: string;

  @prop({})
  position?: number;

  @prop({})
  value: any

}

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.POST,
    timestamps: true,
  },
})

@index(
  {
    userTgId: 1,
    categoryId: 1,
    status: 1,
    isDeleted: 1,
    hashTag: 1
  },
  {
    background: true,
    name: 'categoryId&isDeleted&status&userTgId',
  },
)

@index(
  {
    status: 1,
    id: 1,
  },
  {
    name: 'status&id',
    background: true,
  },
)

@index(
  {
    id: 1,
    hashTag: 1,
  },
  {
    unique: true,
    background: true,
    name: 'hashTag&id',
  },
)

export class Post {

  // //! user mongo _id 
  @prop({ type: Types.ObjectId, ref: COLLECTIONS.USER })
  createdBy?: Ref<User>;

  //! user-id telegram id
  @prop({ required: true })
  userTgId: number;

  @prop({ type: Types.ObjectId, ref: COLLECTIONS.CATEGORY })
  categoryId: Ref<Category>;

  @prop({ default: [], type: [ProprtyValue] })
  public proprties: ProprtyValue[];

  @prop({ default: false })
  public isDeleted: boolean;

  @prop({ default: false })
  public isAvailable: boolean;

  @prop({ enum: Status, default: "proprty" })
  public status: Status;

  @prop({ default: [], type: [String] })
  public photos: string[];

  @prop({ default: 0, })
  public imgCount: number;

  @prop({ trim: true, default: null })
  public postBody: string;

  @prop({})
  public hashTag: string;

}

export const PostModel = getModelForClass(Post);
