// import { UniqueValidatorService } from '@common/constraints/is-unique.constraint';
import { Paginated } from '@common/dtos/paginated.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  /**
   * Request by UniqueValidatorService
   */
  async findExists(field: string, value: string): Promise<boolean> {
    return this.repository.existsBy({ [field]: value } as FindOptionsWhere<T>);
  }

  async findAll(page: number = 1, limit: number = 10, options: FindManyOptions<T> = {}): Promise<Paginated<T>> {
    const [items, total] = await this.repository.findAndCount({
      ...options,
      skip: (page - 1) * limit,
      take: limit,
    });

    return new Paginated<T>(items, page, limit, total);
  }

  findOne(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  create(data: DeepPartial<T>): Promise<T> {
    const repo = this.repository.create(data);
    return this.repository.save(repo);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const item = await this.repository.findOneBy({ id } as any);
    if (!item) throw new NotFoundException('The item does not exist');

    this.repository.merge(item, data);
    return this.repository.save(item);
  }

  async delete(id: number): Promise<T> {
    const item = await this.repository.findOneBy({ id } as any);
    if (!item) throw new NotFoundException('The item does not exist');

    await this.repository.delete(id);
    return item;
  }

  findOneByField(field: keyof T, value: string | number): Promise<T | null> {
    return this.repository.findOneBy({ [field]: value } as FindOptionsWhere<T>);
  }
}
