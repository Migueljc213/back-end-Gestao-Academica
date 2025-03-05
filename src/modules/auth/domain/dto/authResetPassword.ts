import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class AuthResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  password;

  @IsJWT()
  @IsNotEmpty()
  token;
}
