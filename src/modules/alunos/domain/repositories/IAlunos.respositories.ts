import { Aluno } from '@prisma/client';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { UpdateAlunoDto } from '../dto/update-aluno.dto';

export interface IAlunoRepository {
  createAluno(data: CreateAlunoDto): Promise<Aluno>;
  findAluno(id: number): Promise<Aluno | null>;
  findAlunos(): Promise<Aluno[] | null>;
  updateAluno(data: UpdateAlunoDto): Promise<Aluno>;
  deleteAluno(id: number): Promise<Aluno>;
  findAlunoByUserId(userId: number): Promise<Aluno | null>;
}
