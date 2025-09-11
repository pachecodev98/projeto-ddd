import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';

export const USER_ROLES = ['ADMIN', 'TEACHER', 'COORDINATOR', 'STUDENT'] as const;

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(USER_ROLES as any)
  role?: string;
}
