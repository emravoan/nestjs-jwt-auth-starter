import { Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

export class BaseController<T, CreateDto, UpdateDto> {
  constructor(private readonly service: any) {}

  @Get()
  findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<T | null> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateDto): Promise<T> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDto): Promise<T> {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.service.delete(+id);
  }
}
