import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../constant/collections';
import { Category } from '../category/category.model';
import { User } from '../user/user.model';


export enum Status {
  process = "process",
  finish = "finish",
}


export class ProprtyValue {

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
    createdBy: 1,
    userTgId: 1,
    categoryId: 1,
    isDeleted: 1
  },
  {
    background: true,
    name: 'categoryId&isDeleted',
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

  @prop({ required: true, })
  public date: number;

  @prop({ type: [ProprtyValue] })
  public proprties: ProprtyValue[];

  @prop({})
  public isDeleted: boolean;

  @prop({ default: false })
  public isAvailable: boolean;

  @prop({ enum: Status })
  public status: Status;

}

export const PostModel = getModelForClass(Post);
