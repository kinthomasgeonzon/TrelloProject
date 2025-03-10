import { IsNotEmpty, Matches } from 'class-validator';
import { BaseAuthDto } from './base.auth.dto';

export class ReqSignupDto extends BaseAuthDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/(?!^\s*$).+/, {
    message: 'Name cannot be empty or contain only spaces',
  })
  name!: string;
}
