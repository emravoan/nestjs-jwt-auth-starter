import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

export type IsAutoIncrementalInterface = {
  table: string;
  column?: string;
};

@Injectable()
@ValidatorConstraint({ async: true })
export class IsAutoIncrementalConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {
    if (!this.entityManager) {
      const error = new Error(`${this.constructor.name} must be registered as a provider.`);
      console.error(error);
      throw error;
    }
  }

  async validate(_: any, args: ValidationArguments): Promise<boolean> {
    const { table, column } = args.constraints[0] as IsAutoIncrementalInterface;
    const field = column || args.property;
    const entity = args.object as Recordable;

    // Skip during update
    if (entity?.id) return true;

    const query = await this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .select(`MAX(${field})`, 'max')
      .getRawOne();

    args.object[field] = (query?.max || 0) + 1;

    return true;
  }
}

/**
 * Custom validator to assign next incremental value to a field (e.g., `sort`) before insert.
 * Note: This should be used with care; recommended to handle in service.
 */
export function IsAutoIncremental(property: IsAutoIncrementalInterface, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAutoIncrementalConstraint,
    });
  };
}
