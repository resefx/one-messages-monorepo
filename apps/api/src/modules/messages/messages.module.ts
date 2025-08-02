import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesController } from './controllers/messages/messages.controller';
import { MessagesGateway } from './gateway/messages/messages.gateway';
import { MessagesService } from './services/messages/messages.service';
import { PostsService } from './services/posts/posts.service';
import { PostsController } from './controllers/posts/posts.controller';

@Module({
    providers: [PrismaService, MessagesService, MessagesGateway, PostsService],
    controllers: [MessagesController, PostsController],
})
export class MessagesModule { }
