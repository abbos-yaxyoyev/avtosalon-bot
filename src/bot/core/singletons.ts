import { CategoryModel } from '../../common/db/models/category/category.model';
import { CounterModel } from '../../common/db/models/counter/counter.model';
import { PostModel } from '../../common/db/models/post/post.model';
import { UserModel } from '../../common/db/models/user/user.model';
import { ActionController } from '../controller/action.controller';
import { CommandController } from "../controller/command.controller";
import { HearsController } from '../controller/hears.controller';
import { CommandService } from "../service/command.service";
import { CounterService } from '../service/counter.service';
import { HearsService } from '../service/hears.service';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { ActionService } from './../service/action.service';
import { CategoryService } from './../service/category.service';

// services

const commandService = new CommandService();
const actionService = new ActionService();
const herasService = new HearsService();
export const categoryService = new CategoryService(CategoryModel);
export const counterService = new CounterService(CounterModel);
export const userService = new UserService(UserModel);
export const postService = new PostService(PostModel);

// controllers
export const commandController = new CommandController(commandService);
export const actionController = new ActionController(actionService);
export const herasController = new HearsController(herasService);