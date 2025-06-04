import { JwtAuthGuard } from '@api/v1/auth/guards/jwt-auth.guard';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

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

    // Check if the request path is excluded
    if (this.excludedPaths.some((p) => path.includes(`${prefix}/${version}/${p}`))) {
      return true;
    }

    // Check if the request has a valid locale header
    // if (!req.headers['x-locale']) {
    //   throw new UnauthorizedException();
    // }

    return super.canActivate(context);
  }
}
