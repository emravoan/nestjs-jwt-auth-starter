import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user_123' })
  @IsString()
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class RegisterDto extends PartialType(LoginDto) {
  @ApiProperty({ example: 'user123@example.com' })
  @IsEmail()
  @MaxLength(50)
  email: string;
}
