import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProfessorDto } from '../domain/dto/create-professor.dto';
import { UpdateProfessorDto } from '../domain/dto/update-professor.dto';
import { Professor } from '@prisma/client';
import { off } from 'process';

@Injectable()
export class ProfessorRepository {
  constructor(private readonly prisma: PrismaService) {}

  createProfessor(data: CreateProfessorDto) {
    return this.prisma.professor.create({ data });
  }
  findProfessor(id: number): Promise<Professor | null> {
    return this.prisma.professor.findUnique({ where: { id } });
  }
  findProfessores(offset: number, limit: number): Promise<Professor[] | null> {
    return this.prisma.professor.findMany({
      take: limit,
      skip: offset,
      include: { user: true },
    });
  }
  countHotels(): Promise<number> {
    return this.prisma.professor.count();
  }
  updateProfessor(id: number, data: UpdateProfessorDto): Promise<Professor> {
    return this.prisma.professor.update({ where: { id }, data });
  }
  deleteProfessor(id: number): Promise<Professor> {
    return this.prisma.professor.delete({ where: { id } });
  }
}
