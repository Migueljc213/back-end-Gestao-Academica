import { Inject, Injectable } from '@nestjs/common';
import { IAlunoRepository } from '../domain/repositories/IAlunos.respositories';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { ALUNO_REPOSITORY_TOKEN } from '../utils/repositoriesToken';
import { UpdateAlunoDto } from '../domain/dto/update-aluno.dto';

@Injectable()
export default class UpdateAlunoService {
  constructor(
    @Inject(ALUNO_REPOSITORY_TOKEN)
    private readonly alunoRespositories: IAlunoRepository,
  ) {}

  async execute(id:number, updateAlunoDto: UpdateAlunoDto) {
    return await this.alunoRespositories.updateAluno(id, updateAlunoDto);
  }
}
