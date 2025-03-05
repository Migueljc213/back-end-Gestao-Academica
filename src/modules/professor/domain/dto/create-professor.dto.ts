import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: bigint;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;

  @IsNotEmpty()
  matricula: number;

  @IsDate()
  @Type(() => Date)
  dataContratacao: Date;

  @IsDate()
  @Type(() => Date)
  dataSaida: Date;
}
