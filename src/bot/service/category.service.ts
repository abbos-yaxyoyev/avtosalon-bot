import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CommonException } from '../../common/constant/exceptions';
import { Category } from '../../common/db/models/category/category.model';
import { PagingDto } from '../../common/validation/dto/paging.dto';
import { DBService } from './db.service/db.service';

export class CategoryService extends DBService<Category> {
  constructor(model: ModelType<Category>) {
    super(model);
  }

  public async createCategory(data) {
    const result = await this.create(data);
    return result;
  }

  public async updateCategory(id: string, data) {
    const result = await this.updateOne(id, data);
    return result;
  }

  public async deleteCategory(id: string) {

    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(id)
    }

    const result = await this.deleteOne(query)

    return result;

  }

  public async findByIdError(id, options?, projection?) {
    const user = await this.findById(id, options, projection);
    if (!user) throw CommonException.NotFound(id);
    return user;
  }

  public async getPaging(dto: PagingDto) {
    try {

      let { search, tags, sortBy } = dto;



      let query: any = {
        isDeleted: false,
      };

      if (search) {
        query['$expr'] = {
          $regexMatch: {
            input: '$name',
            options: 'ig',
            regex: dto.search,
          },
        };
      }

      if (tags) {
        query['$gt'] = [{ $size: { $setIntersection: ["$tags", tags] } }, 0]
      }

      const $projection = {
        $project: {
          name: 1,
          parentId: 1,
          maxImgAllowed: 1,
          isAvailable: 1,
          tags: 1,
          proprties: 1
        }
      }

      const $pipeline = [
        $projection
      ]

      if (!dto.limit) {
        dto.limit = await this.count(query)
      }

      return await this.findPaging(query, dto, $pipeline, { position: 1, _id: 1 });

    } catch (e) {
      console.log("error category paging: ", e);
      if (e instanceof CommonException) {
        throw e;
      } else {
        throw CommonException.UnknownError(e);
      }
    }
  }

  public async getCategoryById(id: string) {

    const $match = {
      $match: {
        isDeleted: false,
        isAvailable: true,
        _id: new Types.ObjectId(id)
      }
    }

    const $projection = {
      $project: {
        _id: 1,
        id: 1,
        name: 1,
        parentId: 1,
        maxImgAllowed: 1,
        isAvailable: 1,
        tags: 1,
        proprties: 1
      }
    }

    const $pipeline = [
      $match,
      $projection,
    ]

    const result = await this.aggregate($pipeline);

    return result;

  }

  public async categoryPaging() {

    const $match = {
      $match: {
        isDeleted: false,
        isAvailable: true
      }
    }

    const $projection = {
      $project: {
        _id: 1,
        id: 1,
        name: 1,
        parentId: 1,
        maxImgAllowed: 1,
        isAvailable: 1,
        tags: 1,
        proprties: 1
      }
    }

    const $pipeline = [
      $match,
      $projection,
    ]

    const result = await this.aggregate($pipeline);

    return result;

  }

}
