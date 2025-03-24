import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, name: true },
    });
  }
}
