import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProfessorDto } from '../domain/dto/create-professor.dto';
import { UpdateProfessorDto } from '../domain/dto/update-professor.dto';
import { CreateProfessorService } from '../service/createProfessor.service';
import { DeleteProfessorService } from '../service/deleteProfessor.service';
import { FindProfessorService } from '../service/findProfessor.service';
import { FindProfessoresService } from '../service/findProfessores.service';
import { UpdateProfessorService } from '../service/updateProfessor.service';
import { ParamId } from 'src/shared/decorators/ParamId.decorator';

@Controller('professor')
export class ProfessorController {
  constructor(
    private readonly createProfessorService: CreateProfessorService,
    private readonly deleteProfessorService: DeleteProfessorService,
    private readonly findProfessorService: FindProfessorService,
    private readonly findProfessoresService: FindProfessoresService,
    private readonly updateProfessorService: UpdateProfessorService,
  ) {}

  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.createProfessorService.execute(createProfessorDto);
  }

  @Get()
  findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.findProfessoresService.execute(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@ParamId('id') id: number) {
    return this.findProfessorService.execute(id);
  }

  @Patch(':id')
  update(
    @ParamId('id') id: number,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.updateProfessorService.execute(id, updateProfessorDto);
  }

  @Delete(':id')
  remove(@ParamId('id') id: number) {
    return this.deleteProfessorService.execute(id);
  }
}
