import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
export class BaseDtoGroup {
  static CREATE = 'create';
  static UPDATE = 'update';
  static DELETE = 'delete';
  static GET_BY_ID = 'getById';
  static NUMBER = 'number';
  static PAGENATION = 'pagination';
  static SET_STATE = 'state';
  static POSITION = 'position';
  static PHONE_NUMBER = 'phone_number';
}

export class BaseDto {
  @IsOptional({ groups: [BaseDtoGroup.CREATE] })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { groups: [BaseDtoGroup.CREATE] },
  )
  id: number;

  @IsOptional({ groups: [BaseDtoGroup.PAGENATION] })
  @IsMongoId({
    groups: [
      BaseDtoGroup.UPDATE,
      BaseDtoGroup.DELETE,
      BaseDtoGroup.GET_BY_ID,
      BaseDtoGroup.PAGENATION,
    ],
  })
  _id: string;

  @IsOptional({ groups: [BaseDtoGroup.CREATE] })
  createdBy: string;
}

export class GetPagingDto { }
