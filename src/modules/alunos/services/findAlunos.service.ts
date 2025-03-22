import { Inject, Injectable } from '@nestjs/common';
import { IAlunoRepository } from '../domain/repositories/IAlunos.respositories';
import { CreateAlunoDto } from '../domain/dto/create-aluno.dto';
import { ALUNO_REPOSITORY_TOKEN } from '../utils/repositoriesToken';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { REDIS_ALUNO_KEY } from '../utils/redisKey';

@Injectable()
export default class FindAlunosService {
  constructor(
    @Inject(ALUNO_REPOSITORY_TOKEN)
    private readonly alunoRespositories: IAlunoRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async execute() {
    const dataRedis = await this.redis.get(REDIS_ALUNO_KEY);
    let data = dataRedis ? JSON.parse(dataRedis) : null;
    if (!data) {
      data = await this.alunoRespositories.findAlunos();
      await this.redis.set(REDIS_ALUNO_KEY, JSON.stringify(data));
    }
    return data;
  }
}
