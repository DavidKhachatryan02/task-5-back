import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(3000);
  } catch (e) {
    console.log('[APP ERROR]', e);
  }
}
bootstrap();
