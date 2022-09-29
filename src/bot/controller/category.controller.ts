import { BaseDtoGroup } from "../../common/validation/base.dto";
import { CategoryDto } from "../../common/validation/dto/category.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { validateIt } from "../../common/validation/validate";
import { CategoryService } from "../service/category.service";
import { categoryService } from './../core/singletons';

export async function createCategory(request, reply) {
  const data = await validateIt(request.body, CategoryDto, [BaseDtoGroup.CREATE]);

  console.log("this.categoryService: ", this.categoryService);

  const result = await categoryService.createCategory(data);

  return reply.success(result);
}

export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  async create(request, reply) {

    const data = await validateIt(request.body, CategoryDto, [BaseDtoGroup.CREATE]);

    console.log("this.categoryService: ", this.categoryService);

    const result = await this.categoryService.createCategory(data);

    return reply.success(result);

  }

  async updateCategory(request, reply) {

    const data = await validateIt(request.body, CategoryDto, [BaseDtoGroup.UPDATE]);

    const result = await this.categoryService.updateCategory(data._id, data);

    return reply.success(result);
  }

  async deleteCategory(request, reply) {

    const data = await validateIt(request.params, CategoryDto, [BaseDtoGroup.DELETE]);

    const result = await this.categoryService.deleteCategory(data._id);

    return reply.success(result);

  }

  async getCategoryPaging(request, reply) {

    const data = await validateIt(request.params, PagingDto, [BaseDtoGroup.PAGENATION]);

    const result = await this.categoryService.getPaging(data);

    return reply.success(result);

  }

}