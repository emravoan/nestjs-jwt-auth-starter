import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pwdCompare } from '@common/utils/password';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async loginValidator(usr: string, pwd: string) {
    const user = await this.usersService.findOneWithPassword('username', usr);
    if (!user || !(await pwdCompare(pwd, user?.password))) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  login(user: any) {
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
