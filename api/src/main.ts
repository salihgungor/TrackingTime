import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set global prefix to point all calls on /api global endpoint 
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
