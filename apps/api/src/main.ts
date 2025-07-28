import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { auth } from './utils/auth';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: false,
  });

  adapter.getInstance().route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    async handler(request, reply) {
      try {
        // Construct request URL
        const url = new URL(request.url, `http://${request.headers.host}`);

        // Convert Fastify headers to standard Headers object
        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString());
        });

        // Create Fetch API-compatible request
        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        });

        // Process authentication request
        const response = await auth.handler(req);

        // Forward response to client
        reply.status(response.status);
        response.headers.forEach((value, key) => reply.header(key, value));
        reply.send(response.body ? await response.text() : null);
      } catch (error) {
        Logger.error('Authentication Error:', error);
        reply.status(500).send({
          error: 'Internal authentication error',
          code: 'AUTH_FAILURE',
        });
      }
    },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.enableCors({
    origin: 'http://localhost:3600',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT_BACKEND ?? 3003, '0.0.0.0');
}
bootstrap();
