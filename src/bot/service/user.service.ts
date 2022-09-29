import { ModelType } from '@typegoose/typegoose/lib/types';
import { CommonException } from '../../common/constant/exceptions';
import { User } from '../../common/db/models/user/user.model';
import { DBService } from './db.service/db.service';

export class UserService extends DBService<User> {
  constructor(model: ModelType<User>) {
    super(model);
  }

  public async register(data) {

    const result = await this.create(data);

    return result;

  }

  public async findByIdError(id, options?, projection?) {
    const user = await this.findById(id, options, projection);
    if (!user) throw CommonException.NotFound(id);
    return user;
  }

  public async findEmployeeByTgId(tgId: number) {
    return await this.findOneByTgId(tgId);
  }

  public async findUserByTgId(tgId: number) {
    return await this.findOneByTgId(tgId);
  }

  private async findOneByTgId(tgId: number) {
    const query = { id: tgId, isDeleted: false }
    const result = await this.findOne(query);
    return result;
  }

  public async findUserByPhone(phone: string) {
    return await this.findOneByPhone(phone);
  }

  public async findEmployeeByPhone(phone: string) {
    return await this.findOneByPhone(phone);
  }

  public async updateByTgId(id: number, data) {

    const query = {
      id,
      isDeleted: false
    }

    const result = this.findOneAndUpdate(query, data);

    return result;

  }

  private async findOneByPhone(phone: string) {
    const query = { phone_number: phone, isDeleted: false }
    const result = await this.findOne(query);
    return result;
  }

}
