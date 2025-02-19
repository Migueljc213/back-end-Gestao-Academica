import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthForgotDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
