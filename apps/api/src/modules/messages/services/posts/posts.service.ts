import { Injectable } from '@nestjs/common';
import postsEntity from 'src/entities/posts.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) { }

    async getFixedPosts(): Promise<postsEntity[]> {
        return await this.prisma.posts.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 3
        }).then(posts => posts.map((post: postsEntity) => new postsEntity(post)));
    }
}
