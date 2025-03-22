import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamId } from 'src/shared/decorators/ParamId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Role } from '@prisma/client';
import { UserMatchGuard } from 'src/shared/guards/userMatch.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationsInterceptor } from 'src/shared/interceptors/fileValidations.interceptors';
import { Grupo } from 'src/shared/decorators/roles.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Grupo('ADMIN')
  @Get()
  findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.usersService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(UserMatchGuard)
  @Patch(':id')
  update(@ParamId() id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.usersService.remove(+id);
  }

  @UseInterceptors(FileInterceptor('avatar'), FileValidationsInterceptor)
  @Post('avatar')
  uploadAvatar(
    @User('id') id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/*',
          }),
          new MaxFileSizeValidator({
            maxSize: 900 * 1024,
          }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ) {
    return this.usersService.uploadAvatar(id, avatar.filename);
  }
}
