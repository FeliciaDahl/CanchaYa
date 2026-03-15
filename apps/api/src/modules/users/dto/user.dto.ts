import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class UserResponseDto {
  id!: string;
  email!: string;
  name!: string;
  phone?: string;
  avatarUrl?: string;
  role!: 'player' | 'facility_owner' | 'admin';
  emailVerified!: boolean;
  createdAt!: Date;
}
