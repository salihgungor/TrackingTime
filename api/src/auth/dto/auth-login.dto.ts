import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsCompanyEmail } from 'src/common/validator/email.validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginDto {
  @ApiProperty()
  @IsEmail()
  @IsCompanyEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}