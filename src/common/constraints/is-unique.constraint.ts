import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EntityManager } from 'typeorm';

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
    const existing = await this.entityManager
      .getRepository(table)
      .createQueryBuilder(table)
      .where({ [field]: value })
      .getExists();

    return !existing;
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
