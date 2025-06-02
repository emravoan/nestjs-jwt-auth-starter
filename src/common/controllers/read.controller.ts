import { QueryDto } from '@common/dtos/query.dto';
import { Get, Param, ParseIntPipe, Query } from '@nestjs/common';

export class ReadController<T> {
  constructor(private readonly service: any) {}

  @Get()
  findAll(@Query() query: QueryDto): Promise<T[]> {
    const { page: p, limit: l, ...where } = query;
    const page = parseInt(p ?? '1', 10);
    const limit = parseInt(l ?? '10', 10);
    return this.service.findAll(+page, +limit, where);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<T | null> {
    return this.service.findOneById(id);
  }
}
