import { Module } from '@nestjs/common';
import { ProfessorController } from './infra/professor.controller';
import { CreateProfessorService } from './service/createProfessor.service';
import { REPOSITORY_TOKEN_PROFESSOR } from './utils/repositoriesToken';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProfessorRepository } from './infra/professor.repository';
import { DeleteProfessorService } from './service/deleteProfessor.service';
import { FindProfessorService } from './service/findProfessor.service';
import { FindProfessoresService } from './service/findProfessores.service';
import { UpdateProfessorService } from './service/updateProfessor.service';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [ProfessorController],
  providers: [
    CreateProfessorService,
    DeleteProfessorService,
    FindProfessorService,
    FindProfessoresService,
    UpdateProfessorService,
    {
      provide: REPOSITORY_TOKEN_PROFESSOR,
      useClass: ProfessorRepository,
    },
  ],
})
export class ProfessorModule {}
