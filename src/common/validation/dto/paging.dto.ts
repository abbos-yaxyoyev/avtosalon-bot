import { Expose, Transform } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { BaseDto, BaseDtoGroup } from '../base.dto';

export class PagingDto extends BaseDto {
  @Transform(({ value }) => Number(value))
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      groups: [BaseDtoGroup.PAGENATION],
    },
  )
  limit!: number;

  @Transform(({ value }) => Number(value))
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    {
      groups: [BaseDtoGroup.PAGENATION],
    },
  )
  page!: number;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => value?.trim() || '')
  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION],
  })
  @IsString({
    groups: [BaseDtoGroup.PAGENATION],
  })
  search?: string;

  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION],
  })
  @IsDateString(
    {
      strict: false,
    },
    {
      groups: [BaseDtoGroup.PAGENATION],
    },
  )
  updatedAt?: string;

  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION],
  })
  @IsDateString(
    {
      strict: false,
    },
    {
      groups: [BaseDtoGroup.PAGENATION],
    },
  )
  createdAt?: string;

  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION],
  })
  @IsString({
    groups: [BaseDtoGroup.PAGENATION],
  })
  sortBy?: string;

  @Transform(({ value }) => Number(value))
  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION],
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  asc?: number;

  @IsOptional({
    groups: [BaseDtoGroup.PAGENATION],
  })
  @IsArray({
    groups: [BaseDtoGroup.PAGENATION]
  })
  @ValidateIf((data, value: string[]) => {
    value = value.filter((element,) => {
      return element != '';
    })
    return value.length > 0
  }, {
    groups: [BaseDtoGroup.CREATE, BaseDtoGroup.UPDATE],
  })
  tags?: string[];
}
