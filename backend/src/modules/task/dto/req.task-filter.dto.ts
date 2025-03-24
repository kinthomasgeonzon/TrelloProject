import { Status } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsNumber()
  createdBy?: number;

  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsNumber()
  assignedTo?: number;
}
