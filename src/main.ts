import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const APP_PORT = process.env.APP_PORT || 3000;

async function main() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { cors: true },
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableShutdownHooks();
    await app.listen(APP_PORT, () =>
      console.log(
        ` [server]: Server is running at http://localhost:${APP_PORT}`,
      ),
    );
  } catch (e) {
    console.error(`[server]: Error on initializing server => ${e}`);
  }
}

main().then();
