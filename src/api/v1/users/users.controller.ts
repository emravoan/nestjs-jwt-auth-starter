import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@common/controllers/base.controller';

import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends BaseController<Users> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }

  @Post()
  async create(@Body() payload: CreateUsersDto) {
    const { password, ...result } = await this.userService.create(payload);
    return result;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUsersDto) {
    const { password, ...result } = await this.userService.update(id, payload);
    return result;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
