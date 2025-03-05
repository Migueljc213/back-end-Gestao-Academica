import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ThrottlerModule } from '@nestjs/throttler';
import { AlunosModule } from './modules/alunos/alunos.module';
import 'dotenv/config';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 3,
      },
    ]),
    AlunosModule,
    // MailerModule.forRoot({
    //   transport: process.env.SMTP,
    //   defaults: {
    //     from: `"dnc_hotel"<${process.env.EMAIL_USER}> `,
    //   },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
