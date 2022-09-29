import { createCategory } from '../../controller/category.controller';
import { categoryController } from './../../core/singletons';

export const categoryRoutes = [
  {
    method: 'POST',
    url: `/category`,
    handler: createCategory
  },
  {
    method: 'PUT',
    url: `/category`,
    handler: categoryController.updateCategory,
  },
  {
    method: 'GET',
    url: `/category`,
    handler: categoryController.getCategoryPaging,
  },
  {
    method: 'DELETE',
    url: `/category/:_id`,
    handler: categoryController.deleteCategory,
  }
];
