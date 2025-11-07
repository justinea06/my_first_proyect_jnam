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
    .setTitle('my_first_proyect_jnam API')
    .setDescription('API documentation for my_first_proyect_jnam application')
    .setVersion('1.0')
    .addTag('my_first_proyect_jnam')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',  
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',   
    }) // Habilitar autenticación Bearer
    .addSecurityRequirements('Bearer') // Aplicar seguridad globalmente
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Usar variable de entorno correcta
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
