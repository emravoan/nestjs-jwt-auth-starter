import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EntityManager, Not } from 'typeorm';

export type IsUniqueInterface = {
  table: string;
  column?: string;
  message?: string;
};

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const { table, column } = args.constraints[0] as IsUniqueInterface;
    const field = column || args.property;
    const entity = args.object as Recordable;

    const query = this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .where({ [field]: value });

    // Exclude current record during update
    if (entity?.id) {
      query.andWhere({ id: Not(entity.id) });
    }

    const exists = await query.getExists();
    return !exists;
  }

  defaultMessage(args: ValidationArguments) {
    const { message } = args.constraints[0] as IsUniqueInterface;
    return message || `${args.property} already exists`;
  }
}

export function IsUnique(property: IsUniqueInterface, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsUniqueConstraint,
    });
  };
}
