import { Professor } from '@prisma/client';
import { UpdateProfessorDto } from '../dto/update-professor.dto';
import { CreateProfessorDto } from '../dto/create-professor.dto';

export interface IProfessorRepository {
  createProfessor(data: CreateProfessorDto): Promise<Professor>;
  findProfessor(id: number): Promise<Professor>;
  findProfessores(offset: number, limit: number): Promise<Professor | null>;
  countHotels(): Promise<number>;
  updateProfessor(
    id: number,
    data: UpdateProfessorDto,
  ): Promise<UpdateProfessorDto>;
  deleteProfessor(id: number): Promise<Professor>;
}
