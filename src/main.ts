import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const APP_PORT = process.env.PORT || 3000;
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.listen(APP_PORT, () =>
      console.log(
        ` [server]: Server is running at http://localhost:${APP_PORT}`,
      ),
    );
  } catch (e) {
    console.error(`[server]: Error on initializing server => ${e}`);
  }
}

start();
