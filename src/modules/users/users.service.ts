import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import bcrypt from 'bcrypt';
import { userSelectFields } from '../prisma/utils/userSelectField';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateUserDto): Promise<User> {
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

  async remove(id: number) {
    const user = this.isIdExits(id);
    return await this.prisma.user.delete({
      where: { id: id },
      select: userSelectFields,
    });
  }

  isIdExits(id: number) {
    const user = this.prisma.user.findFirst({
      where: { id: id },
      select: userSelectFields,
    });
    if (!user) {
      throw new NotFoundError('Not found user');
    }

    return user;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
