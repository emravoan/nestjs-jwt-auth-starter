import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseService } from '@common/services/base.service';

import { Roles } from './roles.entity';

@Injectable()
export class RolesService extends BaseService<Roles> {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {
    super(rolesRepository);
  }
}
