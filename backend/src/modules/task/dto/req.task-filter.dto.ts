import { IsOptional, IsString } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;
}
