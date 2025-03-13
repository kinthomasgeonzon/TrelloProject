import { IsBoolean } from 'class-validator';

export class DeleteTaskDto {
  @IsBoolean()
  isDeleted!: boolean;
}