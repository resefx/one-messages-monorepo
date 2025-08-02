import { Injectable } from '@nestjs/common';
import messagesEntity from 'src/entities/messages.entity';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private readonly prisma: PrismaService) { }

    async createMessage(
        text: string,
        userId: string,
    ): Promise<Partial<messagesEntity>> {
        return await this.prisma.messages.create({
            data: {
                text,
                userId,
            },
            select: {
                id: true,
                text: true,
                userId: true,
                createdAt: true,
                User: {
                    select: {
                        name: true,
                    }
                }
            }
        });
    }

    async getMessages({
        limit,
    }: {
        limit: number;
    }): Promise<Partial<messagesEntity>[] | Error> {
        return await this.prisma.messages.findMany({
            select: {
                id: true,
                text: true,
                userId: true,
                createdAt: true,
                User: {
                    select: {
                        name: true,
                    }
                }
            },
            take: limit > 100 ? 100 : limit,
            orderBy: {
                createdAt: 'desc',
            },
        }).then(messages => messages.map((message: Partial<messagesEntity>) => new messagesEntity(message)));
    }
}
