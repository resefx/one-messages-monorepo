import {
	CanActivate,
	ContextType,
	ExecutionContext,
	Inject,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Auth } from 'better-auth';
import { fromNodeHeaders } from 'better-auth/node';
import { FastifyRequest } from 'fastify/types/request';
import { Socket } from 'socket.io';
import { AUTH_INSTANCE_KEY, AUTH_IS_PUBLIC_KEY } from '../../../commons/const/auth.const';

// Extend FastifyRequest to include 'session' and 'user'
declare module 'fastify' {
	interface FastifyRequest {
		session?: any;
		user?: any;
	}
}

// Extend the Socket interface to include 'session'
declare module 'socket.io' {
	interface Socket {
		session?: any;
	}
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject(Reflector) private readonly reflector: Reflector,
		@Inject(AUTH_INSTANCE_KEY) private readonly auth: Auth,
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// check if the route is public
		if (
			this.reflector.getAllAndOverride<boolean>(AUTH_IS_PUBLIC_KEY, [
				context.getHandler(),
				context.getClass(),
			])
		)
			return true;

		const contextType: ContextType & 'graphql' = context.getType();
		let request: FastifyRequest | null = null;

		if (contextType === 'ws') {
			const socket = context.switchToWs().getClient<Socket>();
			try {
				const session = await this.auth.api.getSession({
					headers: fromNodeHeaders(socket?.handshake?.headers),
				});
				socket.session = session;
				if (!session) {
					socket.emit('unauthorized', {
						code: 'UNAUTHORIZED',
						message: 'Unauthorized',
					});
				}
				// if (!session) setTimeout(() => socket.disconnect(), 100); // Somente para ter uma ação interna 
				return !!session;
			} catch (_) {
				socket.emit('unauthorized', {
					code: 'UNAUTHORIZED',
					message: 'Unauthorized',
				});
				setTimeout(() => socket.disconnect(), 100); // Aguarda 100ms antes de desconectar
				return false;
			}
		}

		if (contextType === 'graphql') {
			// const gqlCtx = GqlExecutionContext.create(context);
			// request = gqlCtx.getContext()?.req;
			throw new UnauthorizedException({
				code: 'UNAUTHORIZED',
			});
		}
		request = context.switchToHttp().getRequest();

		const session = await this.auth.api.getSession({
			headers: fromNodeHeaders(request?.headers ?? {}),
		});

		if (request) {

			request.session = session;
			request.user = session?.user ?? null; // For Sentry
			Logger.log([request.session, request.user]);
		}

		if (!session) {
			throw new UnauthorizedException({
				code: 'UNAUTHORIZED',
			});
		}

		return true;
	}
}
