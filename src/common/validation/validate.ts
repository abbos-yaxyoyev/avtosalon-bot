import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CommonException } from '../constant/exceptions';

export const validateIt = async <T>(data, classType: ClassConstructor<T>, groups: any): Promise<T> => {
  if (!data) {
    throw CommonException.ValidationError('Request body should be object');
  }

  const classData = plainToClass(classType, data as T, {
    excludeExtraneousValues: false,
  });

  const errors = await validate(classData as any, { groups, whitelist: true });

  if (!errors || errors.length === 0) return classData;

  throw CommonException.ValidationError(errors);
};
