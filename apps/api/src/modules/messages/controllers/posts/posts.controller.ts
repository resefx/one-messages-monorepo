import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import postsEntity from 'src/entities/posts.entity';
import { PostsService } from '../../services/posts/posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Public()
    @Get()
    async getFixedPosts(): Promise<postsEntity[]> {
        return this.postsService.getFixedPosts();
    }
}
