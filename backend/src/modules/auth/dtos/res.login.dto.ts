export class ResLoginDto {
  message!: string;
  token!: string;
  user!: {
    id: number;
    email: string;
    name: string;
  };
}
