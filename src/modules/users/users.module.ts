import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/shared/middlewares/UserIdCheck.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes(
      {
        path: 'users/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'users/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
