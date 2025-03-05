import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
