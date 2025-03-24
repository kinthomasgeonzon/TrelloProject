import { Controller, Get } from "@nestjs/common";
import { UserService } from "../service/user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
