import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CommonException } from '../../common/constant/exceptions';
import { Category } from '../../common/db/models/category/category.model';
import { PagingDto } from '../../common/validation/dto/paging.dto';
import { MyContext } from '../core/context';
import { keyboard } from '../keyboard';
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

  public async findCategoryById(id, options?, projection?) {
    const category = await this.findById(id, options, projection);
    return category;
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

  public async findCategoryByName(name: string, lang: string) {

    let query: any

    if (lang == 'uz') {
      query = {
        isDeleted: false,
        isAvailable: true,
        'name.uz': name
      }
    } else {
      query = {
        isDeleted: false,
        isAvailable: true,
        'name.ru': name
      }
    }

    const projection = {
      _id: 1,
      id: 1,
      name: 1,
      parentId: 1,
      maxImgAllowed: 1,
      isAvailable: 1,
      tags: 1,
      proprties: 1
    }

    return await this.findOne(query, {}, projection);

  }

  public async findManyCategory() {

    const query = {
      isDeleted: false,
      isAvailable: true
    }

    const projection = {
      _id: 1,
      id: 1,
      name: 1,
      parentId: 1,
      maxImgAllowed: 1,
      isAvailable: 1,
      tags: 1,
      proprties: 1
    }

    return await this.find(query, {}, projection);

  }

  public async makeCategoryMenu(ctx: MyContext) {

    const categories = await this.findManyCategory();

    let keyboards = [];

    let column = [];

    for (let i = 0; i < categories.length; i++) {

      if (column.length == 2) {

        keyboards.push(column);

        column = [];
      }

      column.push('📋 ' + categories[i].name[ctx.user.lang]);

      if (i + 1 == categories.length && categories.length % 2 == 1) {
        keyboards.push(column);
      }

    }

    keyboards.push(keyboard.backToLanguage[ctx.user.lang]);

    return keyboards;
  }

}
