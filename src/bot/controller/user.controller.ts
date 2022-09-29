import { UserService } from "../service/user.service";

export class UserController {
  constructor(private userService: UserService) {
  }

  async findOne(req, res) {

  }

}