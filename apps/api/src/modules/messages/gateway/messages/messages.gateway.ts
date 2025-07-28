import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthGuard } from '../../../authenticator/guards/auth.guard';
import { MessagesService } from '../../services/messages/messages.service';

@WebSocketGateway()
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) { }

  @UseGuards(AuthGuard)
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    const msg = await this.messagesService.createMessage(payload, client.session?.user?.id);
    client.broadcast.emit('message', msg);
  }
}
