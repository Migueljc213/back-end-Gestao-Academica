import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAlunoRepository } from '../domain/repositories/IAlunos.respositories';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { ALUNO_REPOSITORY_TOKEN } from '../utils/repositoriesToken';

@Injectable()
export default class CreateAlunoService {
  constructor(
    @Inject(ALUNO_REPOSITORY_TOKEN)
    private readonly alunoRespositories: IAlunoRepository,
  ) {}

  async execute(createAlunoDTO: CreateAlunoDto) {
    const AlunosExist = await this.alunoRespositories.findAlunoByUserId(
      createAlunoDTO.userId,
    );

    if (AlunosExist) throw new BadRequestException('User alredy exists');

    const aluno = await this.alunoRespositories.createAluno({
      nome: createAlunoDTO.nome,
      cpf: BigInt(createAlunoDTO.cpf),
      userId: createAlunoDTO.userId,
      dataNascimento: new Date(createAlunoDTO.dataNascimento),
    });
    return {
      ...aluno,
      cpf: aluno.cpf.toString(),
    };
  }
}
