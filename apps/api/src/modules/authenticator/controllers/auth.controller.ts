import {
    All,
    Body,
    Controller,
    Get,
    Inject,
    Logger,
    Post,
    Req,
    Res,
    Session,
} from '@nestjs/common';
import type { Auth } from 'better-auth';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Public } from 'src/commons/decorators/public.decorator';
import { AUTH_INSTANCE_KEY } from '../../../commons/const/auth.const';

@Controller('api')
export class AuthController {
    constructor(@Inject(AUTH_INSTANCE_KEY) private readonly auth: Auth) { }

    @Get('/auth-api')
    async getAuthApi(@Session() session: any): Promise<string> {
        return session;
    }

    @Public()
    @Post('/auth-api')
    async postAuth(
        @Req() request: Request,
        @Body() body: { email: string; password: string },
    ): Promise<any> {
        return await this.auth.api.signInEmail({
            body: {
                email: body.email,
                password: body.password,
            },
            headers: request.headers,
            asResponse: true,
        });
    }

    @Public()
    @Post('/auth-api/create')
    async postAuthApi(
        @Req() request: Request,
        @Body() body: { name: string; password: string; email: string },
    ): Promise<any> {
        return await this.auth.api.signUpEmail({
            body: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
            headers: request.headers,
            asResponse: true,
        });
    }

    // @All('/auth/*')
    // async handleAllRequests(
    //     @Req() request: FastifyRequest | any,
    //     @Res() response: FastifyReply,
    // ): Promise<void> {
    //     try {
    //         const res = await this.auth.handler(request);
    //         response.status(res.status);
    //         response.send(res.body ? await res.text() : null);
    //     } catch (error) {
    //         if (process.env.NODE_ENV === 'development')
    //             Logger.error('Error in AuthController:', error);

    //         response.status(500).send({
    //             error: 'Internal authentication error',
    //             code: 'AUTH_FAILURE',
    //         });
    //     }
    // }
}
