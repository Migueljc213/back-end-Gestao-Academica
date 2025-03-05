import { Inject, Injectable } from '@nestjs/common';
import { IAlunoRepository } from '../domain/repositories/IAlunos.respositories';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { ALUNO_REPOSITORY_TOKEN } from '../utils/repositoriesToken';

@Injectable()
export default class FindAlunoByIdService {
  constructor(
    @Inject(ALUNO_REPOSITORY_TOKEN)
    private readonly alunoRespositories: IAlunoRepository,
  ) {}

  async execute(id: number) {
    return await this.alunoRespositories.findAluno(id);
  }
}
