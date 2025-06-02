import { IsUnique } from '@common/constraints/is-unique.constraint';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ example: 'user123@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user_123' })
  @IsUnique({ table: 'Users' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class UpdateUsersDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
