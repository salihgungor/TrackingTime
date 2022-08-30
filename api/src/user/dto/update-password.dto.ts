import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsPasswordValid } from 'src/common/validator/password.validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsPasswordValid()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsPasswordValid()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  passwordConfirm: string;
}
