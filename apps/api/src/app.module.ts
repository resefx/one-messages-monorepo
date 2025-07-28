import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticatorModule } from './modules/authenticator/authenticator.module';
import { CachesModule } from './modules/caches/caches.module';
import { MessagesModule } from './modules/messages/messages.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [AuthenticatorModule, PrismaModule, CachesModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
