import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_PROFESSOR } from '../utils/repositoriesToken';
import { IProfessorRepository } from '../domain/repositories/IProfessor.repositories';


@Injectable()
export class DeleteProfessorService {
  constructor(
    @Inject(REPOSITORY_TOKEN_PROFESSOR)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(id: number) {
    return await this.professorRepository.deleteProfessor(id);
  }
}
