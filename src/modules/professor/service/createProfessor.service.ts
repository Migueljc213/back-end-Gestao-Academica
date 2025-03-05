import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_PROFESSOR } from '../utils/repositoriesToken';
import { IProfessorRepository } from '../domain/repositories/IProfessor.repositories';
import { CreateProfessorDto } from '../domain/dto/create-professor.dto';

@Injectable()
export class CreateProfessorService {
  constructor(
    @Inject(REPOSITORY_TOKEN_PROFESSOR)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(data: CreateProfessorDto) {
    return await this.professorRepository.createProfessor(data);
  }
}
