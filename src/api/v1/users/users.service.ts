import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@common/services/base.service';

import { Users } from './users.entity';

@Injectable()
export class UsersService extends BaseService<Users> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super(usersRepository);
    this.relations = ['role'];
  }

  async findOneWithPassword(field: keyof Users, value: string | number): Promise<Users | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where(`user.${field} = :value`, { value })
      .getOne();
  }
}
