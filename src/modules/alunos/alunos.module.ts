import { Module } from '@nestjs/common';
import { AlunosController } from './infra/alunos.controller';
import CreateAlunoService from './services/createAluno.service';
import { ALUNO_REPOSITORY_TOKEN } from './utils/repositoriesToken';
import { AlunosRepository } from './infra/alunos.repository';
import DeleteAlunoService from './services/deleteAluno.service';
import UpdateAlunoService from './services/updateAluno.service';
import FindAlunoByIdService from './services/findAlunoById.service';
import FindAlunosService from './services/findAlunos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [AlunosController],
  providers: [
    CreateAlunoService,
    DeleteAlunoService,
    UpdateAlunoService,
    FindAlunoByIdService,
    FindAlunosService,
    {
      provide: ALUNO_REPOSITORY_TOKEN,
      useClass: AlunosRepository,
    },
  ],
  
})
export class AlunosModule {}
