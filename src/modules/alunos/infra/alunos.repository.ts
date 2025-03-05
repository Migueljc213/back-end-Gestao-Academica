import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { UpdateAlunoDto } from '../domain/dto/update-aluno.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AlunosRepository {
  constructor(private readonly prisma: PrismaService) {}
  createAluno(data: CreateAlunoDto) {
    return this.prisma.aluno.create({ data });
  }

  findAlunos() {
    return this.prisma.aluno.findMany();
  }

  findAluno(id: number) {
    return this.prisma.aluno.findUnique({ where: { id } });
  }
  findAlunoByUserId(userId: number) {
    return this.prisma.aluno.findUnique({ where: { userId } });
  }

  updateAluno(id: number, updateAlunoDto: UpdateAlunoDto) {
    return this.prisma.aluno.update({ where: { id }, data: updateAlunoDto });
  }

  deleteAluno(id: number) {
    return this.prisma.aluno.delete({ where: { id } });
  }
}
