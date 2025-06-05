import { Paginated } from '@common/dto/paginated.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  protected relations: StringArray = [];

  async findAll(page: number = 1, limit: number = 10, options: FindManyOptions<T> = {}): Promise<Paginated<T>> {
    const [items, total] = await this.repository.findAndCount({
      ...options,
      skip: (page - 1) * limit,
      take: limit,
      relations: this.relations,
    });

    return new Paginated<T>(items, page, limit, total);
  }

  findOneById(id: number): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: this.relations,
    });
  }

  findOneByField(field: keyof T, value: string | number): Promise<T | null> {
    return this.repository.findOne({
      where: { [field]: value } as FindOptionsWhere<T>,
      relations: this.relations,
    });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const qb = this.repository.create(data);
    return this.repository.save(qb);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const item = await this.findOneById(id);
    if (!item) throw new NotFoundException('The item does not exist');

    this.repository.merge(item, data, { id: item.id } as DeepPartial<any>);
    return this.repository.save(item);
  }

  async delete(id: number): Promise<T> {
    const item = await this.findOneById(id);
    if (!item) throw new NotFoundException('The item does not exist');

    await this.repository.delete(id);
    return item;
  }

  remove: (id: number) => Promise<T> = this.delete.bind(this);
}
