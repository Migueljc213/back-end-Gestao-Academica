import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requeridRules = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRules) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;
    const usuario = await this.prisma.user.findFirst({
      where: { id: user.id },
      include: {
        grupos: {
          select: {
            grupo: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    if (!usuario || usuario.grupos.length === 0) {
      throw new ForbiddenException('Usuário inválido ou sem grupos');
    }

    const isRoleMatch = requeridRules.some((role) => usuario.grupos.some((grupo) => grupo.grupo.nome === role));

    return isRoleMatch;
  }
}
