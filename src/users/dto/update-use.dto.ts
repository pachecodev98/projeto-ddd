import { IsOptional, IsEmail, MinLength, IsIn, IsBoolean } from 'class-validator';
import { USER_ROLES } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsIn(USER_ROLES as any)
  role?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
