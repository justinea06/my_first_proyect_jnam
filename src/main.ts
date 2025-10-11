import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Activar validaciones DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('YAMM API')
    .setDescription('API documentation for YAMM application')
    .setVersion('1.0')
    .addTag('YAMM')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Usar variable de entorno correcta
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
