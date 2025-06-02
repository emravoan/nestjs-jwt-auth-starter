import { Body, Controller, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ReadController } from '@common/controllers/read.controller';
import { Message } from '@common/decorators/message.decorator';

import { CreateRolesDto } from './roles.dto';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiBearerAuth()
export class RolesController extends ReadController<Roles> {
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
