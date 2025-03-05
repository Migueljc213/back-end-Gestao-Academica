import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../domain/dto/update-aluno.dto';
import CreateAlunoService from '../services/createAluno.service';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Grupo } from 'src/shared/decorators/roles.decorator';
import UpdateAlunoService from '../services/updateAluno.service';
import FindAlunoByIdService from '../services/findAlunoById.service';
import FindAlunosService from '../services/findAlunos.service';
import DeleteAlunoService from '../services/deleteAluno.service';
import { ParamId } from 'src/shared/decorators/ParamId.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('alunos')
export class AlunosController {
  constructor(
    private readonly createAlunoService: CreateAlunoService,
    private readonly updateAlunoService: UpdateAlunoService,
    private readonly findAlunoByIdService: FindAlunoByIdService,
    private readonly findAlunosService: FindAlunosService,
    private readonly deleteAlunoService: DeleteAlunoService,
  ) {}

  @Grupo('ADMIN')
  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.createAlunoService.execute(createAlunoDto);
  }
  @Grupo('ADMIN')
  @Get()
  findAll() {
    return this.findAlunosService.execute();
  }
  @Grupo('ADMIN')
  @Get(':id')
  findOne(@ParamId('id') id: number) {
    return this.findAlunoByIdService.execute(+id);
  }
  @Grupo('ADMIN', 'USER')
  @Patch(':id')
  update(@ParamId('id') id: number, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.updateAlunoService.execute(id, updateAlunoDto);
  }

  @Grupo('ADMIN')
  @Delete(':id')
  delete(@ParamId('id') id: number) {
    return this.deleteAlunoService.execute(+id);
  }
}
