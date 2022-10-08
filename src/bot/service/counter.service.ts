import { ModelType } from '@typegoose/typegoose/lib/types';
import { CommonException } from '../../common/constant/exceptions';
import { Counter } from '../../common/db/models/counter/counter.model';
import { DBService } from './db.service/db.service';

export class CounterService extends DBService<Counter> {
  constructor(model: ModelType<Counter>) {
    super(model);
  }


  public async findByIdError(id, options?, projection?) {
    const user = await this.findById(id, options, projection);
    if (!user) throw CommonException.NotFound(id);
    return user;
  }

}
