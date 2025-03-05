import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface JwtPayload {
  name?: string;
  iat?: number;
  expiresIn?: number;
  issuers?: string;
  sub?: string;
  audience?: string;
}

export class ValidateTokenDTO {
  @IsBoolean()
  @IsNotEmpty()
  valid: boolean;

  decoded?: JwtPayload;

  @IsString()
  @IsOptional()
  message?: string;
}
