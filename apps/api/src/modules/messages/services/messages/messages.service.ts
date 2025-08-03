import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import messagesEntity from 'src/entities/messages.entity';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async createMessage(
        text: string,
        userId: string,
    ): Promise<Partial<messagesEntity>> {
        const cache = await this.cacheManager.get(`messages:${userId}`);
        if (cache) {
            return cache;
        }
        const resp = (await this.prisma.messages
            .create({
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
                        },
                    },
                },
            })
            .then(
                (message) => new messagesEntity(message),
            )) as Partial<messagesEntity>;

        await this.cacheManager.set(`messages:${userId}`, resp, 60000);
        return resp;
    }

    async getMessages({
        limit,
    }: {
        limit: number;
    }): Promise<Partial<messagesEntity>[] | Error> {
        const cache = await this.cacheManager.get(`getMessages:${limit}`);
        if (cache) {
            return cache as Partial<messagesEntity>[];
        }
        const resp = await this.prisma.messages
            .findMany({
                select: {
                    id: true,
                    text: true,
                    userId: true,
                    createdAt: true,
                    User: {
                        select: {
                            name: true,
                        },
                    },
                },
                take: limit > 100 ? 100 : limit,
                orderBy: {
                    createdAt: 'desc',
                },
            })
            .then((messages) =>
                messages.map(
                    (message: Partial<messagesEntity>) => new messagesEntity(message),
                ),
            );
        await this.cacheManager.set(`getMessages:${limit}`, resp, 60000);
        return resp;
    }
}
