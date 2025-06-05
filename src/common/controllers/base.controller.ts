import { QueryDto } from '@common/dto/query.dto';
import { Get, Delete, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiBearerAuth()
// @ApiHeader({
//   name: 'x-locale',
//   description: 'Locale code (e.g. en, km)',
//   schema: {
//     type: 'string',
//     example: 'en',
//   },
// })
export class BaseController<T> {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
