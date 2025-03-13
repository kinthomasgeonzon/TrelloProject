import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Status)
  status!: Status;

  @IsInt()
  @IsOptional()
  assignedTo?: number;

  @IsInt()
  @IsNotEmpty()
  taskOrder!: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
