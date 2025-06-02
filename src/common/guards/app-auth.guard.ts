import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { JwtAuthGuard } from '@api/v1/auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppAuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private config: ConfigService,
    private reflector: Reflector,
  ) {
    super(config);
  }

  private excludedPaths = ['auth'];

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const path = req.route?.path || req.url;

    const prefix = this.config.get('api.prefix');
    const version = this.config.get('api.version');

    if (this.excludedPaths.some((excludedPath) => path.includes(`${prefix}/${version}/${excludedPath}`))) {
      return true;
    }

    return super.canActivate(context);
  }
}
