import { V1Module } from '@api/v1/v1.module';
import { IsAutoIncrementalConstraint } from '@common/constraints/is-auto-incremental.constraint';
import { IsUniqueConstraint } from '@common/constraints/is-unique.constraint';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { LoggerFactory } from '@common/utils/logger/logger-factory';
import { ValidationPipeFactory } from '@common/utils/pipes/pipe-factory';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'config/app.config';
import { getTypeOrmConfig } from 'database/typeorm.config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    LoggerModule.forRootAsync(LoggerFactory),
    V1Module,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: ValidationPipeFactory,
    },
    IsUniqueConstraint,
    IsAutoIncrementalConstraint,
  ],
})
export class AppModule {}
