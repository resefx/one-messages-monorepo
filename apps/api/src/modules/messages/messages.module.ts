import { Module } from '@nestjs/common';
import { CachesModule } from '../caches/caches.module';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesController } from './controllers/messages/messages.controller';
import { PostsController } from './controllers/posts/posts.controller';
import { MessagesGateway } from './gateway/messages/messages.gateway';
import { MessagesService } from './services/messages/messages.service';
import { PostsService } from './services/posts/posts.service';

@Module({
    imports: [CachesModule],
    providers: [PrismaService, MessagesService, MessagesGateway, PostsService],
    controllers: [MessagesController, PostsController],
})
export class MessagesModule { }
