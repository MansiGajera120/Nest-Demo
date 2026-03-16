import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  bio?: string;

  @IsOptional()
  profile?: string;

  @IsString()
  deviceType?: string;

  @IsString()
  deviceToken?: string;

  @IsString()
  @IsNotEmpty()
  otpCode?: string;
}
