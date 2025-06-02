import { applyDecorators, SetMetadata } from '@nestjs/common';

export function Message(msg: string) {
  return applyDecorators(SetMetadata('decorator:message', msg));
}
