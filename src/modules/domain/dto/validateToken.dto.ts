import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ValidateTokenDTO {
  @IsBoolean()
  @IsNotEmpty()
  valid: boolean;

  decoded;

  @IsString()
  @IsOptional()
  message: string;
}
