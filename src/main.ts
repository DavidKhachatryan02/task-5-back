import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 3000;
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.listen(PORT, () =>
      console.log(`Server started on port = ${PORT}`),
    );
  } catch (e) {
    console.log('[APP ERROR] =>', e);
  }
}

start();
