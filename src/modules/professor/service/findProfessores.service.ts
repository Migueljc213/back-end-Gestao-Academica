import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_PROFESSOR } from '../utils/repositoriesToken';
import { IProfessorRepository } from '../domain/repositories/IProfessor.repositories';


@Injectable()
export class FindProfessoresService {
  constructor(
    @Inject(REPOSITORY_TOKEN_PROFESSOR)
    private readonly professorRepository: IProfessorRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const data = await this.professorRepository.findProfessores(offset, limit);
    const total = await this.professorRepository.countHotels()


    return { 
      data,
      total,
      page,
      per_page: limit
    }
  }
}
