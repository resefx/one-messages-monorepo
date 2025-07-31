import { Logger, UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthGuard } from '../../../authenticator/guards/auth.guard';
import { MessagesService } from '../../services/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3600',
    credentials: true,
  }
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) { }

  async handleConnection(client: Socket) {
    const user = client.handshake.auth?.user || client.handshake.headers?.['user-id'];
    Logger.warn(`Cliente conectado: ${client.id}, User: ${user}`);
  }

  async handleDisconnect(client: Socket) {
    Logger.warn(`Cliente desconectado: ${client.id}`);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    Logger.log(`Received message from ${client.id}: ${payload}`);
    const msg = await this.messagesService.createMessage(payload, client.session?.user?.id);
    Logger.log(`Message created: ${JSON.stringify(msg)}`);
    client.emit('message', msg);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('hello')
  handleEvent(@MessageBody() data: string): string {
    console.log('Received hello event:', data);
    return data;
  }
}
