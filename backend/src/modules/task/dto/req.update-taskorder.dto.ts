import { IsInt } from 'class-validator';

export class UpdateTaskOrderDto {
  @IsInt()
  taskOrder!: number;
}
