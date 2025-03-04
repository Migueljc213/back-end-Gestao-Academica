import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";



export const ROLES_KEY = 'grupo';
export const Grupo = (...grupos: string[]) => SetMetadata(ROLES_KEY, grupos)