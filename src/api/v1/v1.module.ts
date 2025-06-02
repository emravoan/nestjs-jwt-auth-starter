import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import { AppAuthGuard } from '@common/guards/app-auth.guard';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

const modules = [AuthModule, UsersModule, RolesModule];

@Module({
  imports: [...modules, RouterModule.register(modules.map((module) => ({ path: '', module })))],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class V1Module {}
