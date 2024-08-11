import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'

async function bootstrap() {
  // Call first to have access to .env variables
  dotenv.config();

  const app = await NestFactory.create(AppModule);
    
  app.enableCors({
    origin: 'http://localhost:4200',  // Allow only Angular app to access
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
