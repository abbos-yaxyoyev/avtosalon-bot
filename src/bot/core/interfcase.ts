import { Types } from 'mongoose';

export interface UserInterface {

  _id: Types.ObjectId;

  id: number;

  is_bot: boolean;

  first_name: string;

  language_code?: string;

  username?: string;

  isDeleted: boolean;
}

interface FieldLanguageInterface {

  uz: string;

  ru: string;

}

interface ProprtyInterface {

  field: FieldLanguageInterface;

  validate_type: string;

  position?: number;

  isRequired: boolean;

  description: FieldLanguageInterface;

}

export interface CategoryInterface {

  parentId?: Types.ObjectId;

  cretedBy?: Types.ObjectId;

  employeeTgId: number;

  name: string,

  maxImgAllowed?: number;

  isAvailable: boolean;

  tags: string[],

  isDeleted: boolean;

  proprties: ProprtyInterface[];

}

interface ProprtyValueInterface {

  field: string;

  position?: number;

  value: any

}

export interface PostInterface {

  createdBy?: Types.ObjectId;

  userTgId: number;

  categoryId: Types.ObjectId;

  date: number;

  proprties: ProprtyValueInterface[];

  isDeleted: boolean;

  isAvailable: boolean;

  status: string;

}
