import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { userSelectFields } from '../prisma/utils/userSelectField';
import { join, resolve } from 'path';
import { stat, unlink } from 'fs/promises';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto): Promise<User> {
    const emailExist = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (emailExist) {
      throw new UnauthorizedException('Email already exists');
    }

    body.password = await this.hashPassword(body.password);

    return await this.prisma.user.create({
      data: body,
      select: userSelectFields,
    });
  }

  findAll() {
    return this.prisma.user.findMany({ select: userSelectFields });
  }

  findOne(id: number) {
    const user = this.isIdExits(id);
    return user;
  }

  async update(id: number, body: UpdateUserDto) {
    await this.isIdExits(id);

    if (body.email) {
      const emailExist = await this.prisma.user.findUnique({
        where: { email: body.email },
      });
      if (emailExist) {
        throw new UnauthorizedException('Email already exists');
      }
    }

    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }
    const user = await this.prisma.user.update({
      where: { id: id },
      data: body,
      select: userSelectFields,
    });
    return user;
  }

  async uploadAvatar(id: number, avatarFilename: string) {
    const user = await this.isIdExits(id);
    const directory = resolve(__dirname, '..', '..', '..', 'uploads');

    if (user.avatar) {
      const userAvatarFilePath = join(directory, user.avatar);
      const userAvatarFileExists = await stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await unlink(userAvatarFilePath);
      }
    }

    const userUpdated = await this.update(id, { avatar: avatarFilename });

    return userUpdated;
  }

  async remove(id: number) {
    const user = this.isIdExits(id);
    return await this.prisma.user.delete({
      where: { id: id },
      select: userSelectFields,
    });
  }

  async isIdExits(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
      select: userSelectFields,
    });
    if (!user) {
      throw new NotFoundError('Not found user');
    }
    console.log(user);
    return user;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
