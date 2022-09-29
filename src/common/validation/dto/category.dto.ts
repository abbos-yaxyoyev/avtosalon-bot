import { Transform, Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsBoolean, IsMongoId, IsNotEmptyObject, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BaseDto, BaseDtoGroup } from '../base.dto';

/* --- FileLanguageDto --- */
class FileLanguageDto {
  @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsString({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  uz: string

  @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsString({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  ru: string
}
/* --- ProprtyDto --- */
class ProprtyDto {

  @ValidateNested({
    groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE,],
  })
  @IsNotEmptyObject(
    {
      nullable: false,
    },
    {
      groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
    },
  )
  @Type(() => FileLanguageDto)
  field: FileLanguageDto;

  @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsString({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  validate_type: string;

  @IsOptional({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  @IsBoolean({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  isRequired: boolean;

  @ValidateNested({
    groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE,],
  })
  @IsNotEmptyObject(
    {
      nullable: false,
    },
    {
      groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
    },
  )
  @Type(() => FileLanguageDto)
  description: FileLanguageDto;

}
/* --- CategoryDto --- */
export class CategoryDto extends BaseDto {

  @IsOptional({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  @IsMongoId({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  parentId: string;

  @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] },
  )
  userTgId: number;

  @ValidateNested({
    groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE,],
  })
  @IsNotEmptyObject(
    {
      nullable: false,
    },
    {
      groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
    },
  )
  @Type(() => FileLanguageDto)
  name: FileLanguageDto;

  @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] },
  )
  maxImgAllowed: number;

  @IsOptional({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  @IsBoolean({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  isAvailable: boolean;

  @IsOptional({ groups: [BaseDtoGroup.UPDATE] })
  @IsArray({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  @Transform(({ value }) => {
    return value.filter((elem) => {
      return elem != '';
    })
  })
  @ArrayMinSize(1)
  tags: string[];

  @IsArray({ groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE] })
  @ValidateNested({
    each: true,
    groups: [BaseDtoGroup.UPDATE, BaseDtoGroup.CREATE,],
  })
  @IsNotEmptyObject(
    {
      nullable: false,
    },
    {
      each: true,
      groups: [BaseDtoGroup.UPDATE, BaseDtoGroup.CREATE,]
    },
  )
  @Type(() => ProprtyDto)
  proprties: ProprtyDto[];

}
