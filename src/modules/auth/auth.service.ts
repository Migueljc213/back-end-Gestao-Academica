import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthLoginDTO } from '../domain/dto/authLogin.dto';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { userSelectFields } from '../prisma/utils/userSelectField';
import { AuthRegisterDTO } from '../domain/dto/authRegister.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResetPasswordDTO } from '../domain/dto/authResetPassword';
import { ValidateTokenDTO } from '../domain/dto/validateToken.dto';
import { AuthForgotDTO } from '../domain/dto/authForgot.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async generateJwtToken(user: User, expiresIn: string = '1d') {
    const payload = { sub: user.id, name: user.name };
    const options = {
      expiresIn: expiresIn,
      issuer: 'dnc_hotel',
      audience: 'users',
    };

    return { access_token: this.jwtService.sign(payload, options) };
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    return await this.generateJwtToken(user);
  }

  async register(body: AuthRegisterDTO) {
    const newUser: CreateUserDto = {
      email: body.email,
      name: body.name,
      password: body.password,
      role: body.role,
    } as CreateUserDto;
    const user = await this.usersService.create(newUser);

    return this.generateJwtToken(user);
  }

  async resetPassword({ password, token }: AuthResetPasswordDTO) {
    //recebendo o token, verificando se é valido no sistema
    const { valid, decoded } = await this.validateToken(token);
    // se não for, retorna um unauthorized
    if (!valid || decoded == undefined)
      throw new UnauthorizedException('Invalid token');
    //fazendo o update pegando o id do user do decoded do token
    const user = await this.usersService.update(Number(decoded.sub), {
      password,
    });
    //gerando um token no fim do processo
    return await this.generateJwtToken(user);
  }

  async validateToken(token: string): Promise<ValidateTokenDTO> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'dnc_hotel',
        audience: 'users',
      });

      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }

  async forgot(email: string) {
    const user = await this.findByEmail(email);

    if (!user) throw new UnauthorizedException('Email not found');

    const token = await this.generateJwtToken(user, '30min');

    return token;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: userSelectFields,
    });
  }
}
