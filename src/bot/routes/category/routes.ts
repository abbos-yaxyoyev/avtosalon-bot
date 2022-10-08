import { categoryPaging, createCategory, deleteCategory, updateCategory } from '../../controller/category.controller';

export const categoryRoutes = [
  {
    method: 'POST',
    url: `/category`,
    handler: createCategory,
  },
  {
    method: 'PUT',
    url: `/category`,
    handler: updateCategory,
  },
  {
    method: 'GET',
    url: `/category`,
    handler: categoryPaging,
  },
  {
    method: 'DELETE',
    url: `/category/:_id`,
    handler: deleteCategory,
  }
];
