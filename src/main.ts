/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 204
  });
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
