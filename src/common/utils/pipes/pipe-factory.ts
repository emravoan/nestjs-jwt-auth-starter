import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const ValidationPipeFactory = () =>
  new ValidationPipe({
    whitelist: true,
    transform: true,
    disableErrorMessages: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(({ property, constraints }) => ({
        field: property,
        messages: Object.values(constraints || {}),
      }));

      return new BadRequestException({
        message: 'Some fields are invalid. Please check and try again.',
        errors: formattedErrors,
      });
    },
  });
