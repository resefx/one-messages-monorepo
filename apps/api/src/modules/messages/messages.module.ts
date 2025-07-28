import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesController } from './controllers/messages/messages.controller';
import { MessagesGateway } from './gateway/messages/messages.gateway';
import { MessagesService } from './services/messages/messages.service';

@Module({
    providers: [PrismaService, MessagesService, MessagesGateway],
    controllers: [MessagesController],
})
export class MessagesModule { }
