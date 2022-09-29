import { Transform } from 'class-transformer';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { BaseDto, BaseDtoGroup } from '../base.dto';


export class UserDto extends BaseDto {

  @IsOptional({ groups: [BaseDtoGroup.PHONE_NUMBER] })
  @Transform(({ value }) => `+${value?.replace(/[^0-9]/g, '')}`)
  @IsPhoneNumber(null, {
    groups: [BaseDtoGroup.CREATE, BaseDtoGroup.PHONE_NUMBER],
  })
  phone_number: string;

  // @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsString({ groups: [BaseDtoGroup.CREATE] })
  first_name: string;

  @IsOptional({ groups: [BaseDtoGroup.CREATE] })
  @IsString({ groups: [BaseDtoGroup.CREATE] })
  last_name: string;

  @IsString({ groups: [BaseDtoGroup.CREATE] })
  username: string;

  @IsString({ groups: [BaseDtoGroup.CREATE] })
  language_code: string;
}
