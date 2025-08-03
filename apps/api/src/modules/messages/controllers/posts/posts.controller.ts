import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import postsEntity from 'src/entities/posts.entity';
import { PostsService } from '../../services/posts/posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    @Public()
    @Get()
    async getFixedPosts(): Promise<postsEntity[]> {
        const cache = await this.cacheManager.get(`getFixedPosts`);
        if (cache) {
            return cache as postsEntity[];
        }
        const resp = await this.postsService.getFixedPosts();
        await this.cacheManager.set(`getFixedPosts`, resp, 60000);
        return resp;
    }
}
