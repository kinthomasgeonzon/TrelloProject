import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
