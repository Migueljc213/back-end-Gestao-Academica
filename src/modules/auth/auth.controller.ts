import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from '../domain/dto/authLogin.dto';
import { AuthRegisterDTO } from '../domain/dto/authRegister.dto';
import { AuthResetPasswordDTO } from '../domain/dto/authResetPassword';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Patch('reset-password')
  resetPassword(@Body() { password, token }: AuthResetPasswordDTO) {
    return this.authService.resetPassword({ password, token });
  }
}
