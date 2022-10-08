import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CommonException } from '../../common/constant/exceptions';
import { Post } from '../../common/db/models/post/post.model';
import { PagingDto } from '../../common/validation/dto/paging.dto';
import { DBService } from './db.service/db.service';

export class PostService extends DBService<Post> {
  constructor(model: ModelType<Post>) {
    super(model);
  }

  public async createPost(data) {
    const result = await this.create(data);
    return result;
  }

  public async updatePost(id: string, data) {
    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(id)
    }
    const result = await this.updateOneByQuery(query, data);
    return result;
  }

  public async deletePost(id: string) {

    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(id)
    }

    const result = await this.deleteOne(query)

    return result;

  }

  public async findByIdError(id, options?, projection?) {
    const post = await this.findById(id, options, projection);
    return post;
  }

  public async getPaging(dto: PagingDto) {
    try {

      let { search, tags, sortBy } = dto;

      let query: any = {
        isDeleted: false,
        isAvailable: true
      };

      if (search) {
        query['$expr'] = {
          $regexMatch: {
            input: '$hashTag',
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
          tags: 1,
          photos: 1,
          postBody: 1,
          imgCount: 1,
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
      console.log("error post paging: ", e);
      if (e instanceof CommonException) {
        throw e;
      } else {
        throw CommonException.UnknownError(e);
      }
    }
  }

  public async getPostById(id: string) {

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

  public async findOnePost(query: any, options?, projection?) {
    return await this.findOne(query, options, projection);
  }


}
