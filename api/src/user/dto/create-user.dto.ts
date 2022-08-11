import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsCompanyEmail } from "src/common/validator/email.validator";
import { IsPasswordValid } from "src/common/validator/password.validator";
import { UserRole } from "../entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsCompanyEmail()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPasswordValid()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsEnum(UserRole,{each:true})
  @IsOptional()
  roles: UserRole[];
}