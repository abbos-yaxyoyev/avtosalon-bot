import { BaseDtoGroup } from "../../common/validation/base.dto";
import { CategoryDto } from "../../common/validation/dto/category.dto";
import { PagingDto } from "../../common/validation/dto/paging.dto";
import { validateIt } from "../../common/validation/validate";
import { categoryService } from "../core/singletons";



export async function createCategory(request, reply) {

  const data = await validateIt(request.body, CategoryDto, [BaseDtoGroup.CREATE]);

  console.log("categoryService: ", categoryService);

  const result = await categoryService.createCategory(data);

  return reply.success(result);

}

export async function updateCategory(request, reply) {

  console.log("category: ", await categoryService);

  const data = await validateIt(request.body, CategoryDto, [BaseDtoGroup.UPDATE]);

  const result = await categoryService.updateCategory(data._id, data);

  return reply.success(result);
}

export async function deleteCategory(request, reply) {

  const data = await validateIt(request.params, CategoryDto, [BaseDtoGroup.DELETE]);

  const result = await categoryService.deleteCategory(data._id);

  return reply.success(result);

}

export async function categoryPaging(request, reply) {

  const data = await validateIt(request.params, PagingDto, [BaseDtoGroup.PAGENATION]);

  const result = await categoryService.getPaging(data);

  return reply.success(result);

}
