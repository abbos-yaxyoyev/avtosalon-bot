import { Types } from "mongoose"

export interface UserInterface {

  _id: string | Types.ObjectId

  id: number

  is_bot?: boolean

  first_name: string

  language_code?: string

  username?: string

  isDeleted?: boolean;

  lang: string;

  categoryId: string;

  proprtyIndex: number;

  scenesWizard: string;

}