import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('app.port');
  const prefix = config.get('api.prefix');
  const version = config.get('api.version');

  const swagConfig = new DocumentBuilder().setTitle('Rest API').setVersion('1.0').addBearerAuth().build();
  const swagFactory = () => SwaggerModule.createDocument(app, swagConfig);
  SwaggerModule.setup('swagger', app, swagFactory);

  app.setGlobalPrefix(`${prefix}/${version}`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map(({ property, constraints }) => ({
          field: property,
          messages: Object.values(constraints || {}),
        }));

        return new BadRequestException({
          message: 'Some fields are invalid. Please check and try again.',
          errors: formattedErrors,
        });
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port);
  console.log(`Swagger is running on: http://localhost:${port}/swagger`);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
