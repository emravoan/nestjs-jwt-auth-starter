import { localeMiddleware } from '@common/middlewares/locale.middleware';
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

  app.use(localeMiddleware);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port);
  console.log(`Swagger is running on: http://localhost:${port}/swagger`);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
