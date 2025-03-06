import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ReqSignupDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?!\s+$).+/, {
    message: 'Password cannot be empty or contain only spaces',
  })
  password!: string;

  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^(?!\s*$).+/, {
    message: 'Name cannot be empty or contain only spaces',
  })
  name!: string;
}
