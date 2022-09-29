import { ERROR_CODES } from "./error_codes";

export class CommonException {
  constructor(public code: number, public message: string, public data: any) { }
  public static UnknownError(data?: any) {
    return new CommonException(ERROR_CODES.BASE, 'Unknown error', data);
  }

  public static ValidationError(data?: any) {
    return new CommonException(ERROR_CODES.BASE + 1, 'Validation Error', data);
  }

  static AllreadyExist(data) {
    return new CommonException(ERROR_CODES.BASE + 2, 'user exist', data);
  }

  static NotFound(data) {
    return new CommonException(ERROR_CODES.BASE + 3, 'user not found', data);
  }

  static NotEnoughPermission(data: any = null) {
    return new CommonException(ERROR_CODES.BASE + 4, 'Not enough permissions to access', data);
  }
}
