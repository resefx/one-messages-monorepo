import { Controller, Get, Query } from '@nestjs/common';
import messagesEntity from 'src/entities/messages.entity';
import { Public } from '../../../../commons/decorators/public.decorator';
import { MessagesService } from '../../services/messages/messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Public()
    @Get()
    async getMessages(
        @Query('limit') limit: string,
    ): Promise<Partial<messagesEntity>[] | Error> {
        return this.messagesService.getMessages({
            limit: parseInt(limit, 10) || 10,
        });
    }
}
