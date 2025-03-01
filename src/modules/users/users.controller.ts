import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,

} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamId } from 'src/shared/decorators/ParamId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Get()
  findAll(@User('email') req) {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@ParamId() id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.usersService.remove(+id);
  }
}
