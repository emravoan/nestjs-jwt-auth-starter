import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Users } from '@api/v1/users/users.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(usr: string, pwd: string): Promise<Partial<Users>> {
    const user = await this.authService.loginValidator(usr, pwd);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
