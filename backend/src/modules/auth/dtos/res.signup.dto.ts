export class ResSignupDto {
  message!: string;
  token!: string;
  user!: {
    id: number;
    email: string;
    name: string;
  };
}
