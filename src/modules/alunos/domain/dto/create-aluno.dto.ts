import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome: string;

  @IsNotEmpty()
  cpf: bigint;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsDate()
  @Type(() => Date)
  dataNascimento: Date;
}
