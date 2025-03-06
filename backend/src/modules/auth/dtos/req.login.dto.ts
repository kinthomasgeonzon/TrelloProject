import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ReqLoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^(?!\s*$).+/, {
    message: 'Email cannot be empty or contain only spaces',
  })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?!\s*$).+/, {
    message: 'Password cannot be empty or contain only spaces',
  })
  password!: string;
}
