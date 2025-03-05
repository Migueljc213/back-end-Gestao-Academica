import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_PROFESSOR } from '../utils/repositoriesToken';
import { IProfessorRepository } from '../domain/repositories/IProfessor.repositories';
import { UpdateProfessorDto } from '../domain/dto/update-professor.dto';

@Injectable()
export class UpdateProfessorService {
  constructor(
    @Inject(REPOSITORY_TOKEN_PROFESSOR)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(id:number,data: UpdateProfessorDto) {
    return await this.professorRepository.updateProfessor(id, data);
  }
}
