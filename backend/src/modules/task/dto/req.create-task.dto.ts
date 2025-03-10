import { Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Status)
  status!: Status;

  @IsInt()
  @IsNotEmpty()
  createdBy!: number;

  @IsInt()
  @IsOptional()
  assignedTo?: number;

  @IsInt()
  @IsNotEmpty()
  taskOrder!: number;

  @IsOptional()
  @Transform(({ value }: { value: string | number | Date }) =>
    value ? new Date(value) : null,
  )
  @IsDate()
  dueDate?: Date;
}
