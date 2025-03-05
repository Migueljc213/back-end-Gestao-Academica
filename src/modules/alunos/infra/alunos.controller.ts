import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../domain/dto/update-aluno.dto';
import CreateAlunoService from '../services/createAluno.service';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Grupo } from 'src/shared/decorators/roles.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('alunos')
export class AlunosController {
  constructor(private readonly createAlunoService: CreateAlunoService,) {}

  @Grupo('ADMIN')
  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.createAlunoService.execute(createAlunoDto);
  }

  // @Get()
  // findAll() {
  //   return this.alunosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.alunosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
  //   return this.alunosService.update(+id, updateAlunoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.alunosService.remove(+id);
  // }
}
