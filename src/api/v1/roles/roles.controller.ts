import { Body, Controller, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { BaseController } from '@common/controllers/base.controller';
import { Message } from '@common/decorators/message.decorator';

import { CreateRolesDto } from './roles.dto';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController extends BaseController<Roles> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Post()
  create(@Body() data: CreateRolesDto): Promise<Roles> {
    return this.rolesService.create(data);
  }

  @Put(':id')
  @Message('Role updated successfully')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: CreateRolesDto): Promise<Roles> {
    return this.rolesService.update(id, data);
  }
}
