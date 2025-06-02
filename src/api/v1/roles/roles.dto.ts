import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '@common/constraints/is-unique.constraint';

export class CreateRolesDto {
  @ApiProperty({ example: 'admin', description: 'Role name (unique)' })
  @IsUnique({ table: 'Roles' })
  @IsString()
  @Length(1, 50)
  name: string;
}
