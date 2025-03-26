import { Status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateTaskDto {
  @IsEnum(Status, { message: "status must be a valid task status (TODO, IN_PROGRESS, DONE)" })
  status!: Status;
}
