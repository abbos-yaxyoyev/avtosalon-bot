import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPhoneNumber } from 'class-validator';
import { BaseDto, BaseDtoGroup } from '../base.dto';


export class MessageDto extends BaseDto {

  @IsNumber({ allowInfinity: false, allowNaN: false }, { groups: [BaseDtoGroup.CREATE] })
  counter: number;

  @IsOptional({ groups: [BaseDtoGroup.PHONE_NUMBER] })
  @Transform(({ value }) => `+${value?.replace(/[^0-9]/g, '')}`)
  @IsPhoneNumber(null, {
    groups: [BaseDtoGroup.CREATE, BaseDtoGroup.PHONE_NUMBER],
  })
  phone_number: string;

  //* mongodb _id
  @IsOptional({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.PHONE_NUMBER] })
  userId: string;

  //* telegram chat id 
  @IsOptional({ groups: [BaseDtoGroup.CREATE] })
  chat_id: number;
}
