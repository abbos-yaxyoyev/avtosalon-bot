import { CategoryModel } from '../../common/db/models/category/category.model';
import { UserModel } from '../../common/db/models/user/user.model';
import { ActionController } from '../controller/action.controller';
import { CategoryController } from '../controller/category.controller';
import { CommandController } from "../controller/command.controller";
import { HearsController } from '../controller/hears.controller';
import { CommandService } from "../service/command.service";
import { HearsService } from '../service/hears.service';
import { UserService } from '../service/user.service';
import { ActionService } from './../service/action.service';
import { CategoryService } from './../service/category.service';

// services

const commandService = new CommandService();
const actionService = new ActionService();
const herasService = new HearsService();
export const categoryService = new CategoryService(CategoryModel);
export const userService = new UserService(UserModel);

// controllers
export const commandController = new CommandController(commandService);
export const actionController = new ActionController(actionService);
export const herasController = new HearsController(herasService);
export const categoryController = new CategoryController(categoryService);