import { IsOptional, IsEmail, MinLength, IsIn, IsBoolean } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

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
  @IsIn(UserRole as any)
  role?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
