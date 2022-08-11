import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsCompanyEmail } from "src/common/validator/email.validator";
import { IsPasswordValid } from "src/common/validator/password.validator";
import { UserRole } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    firstname: string;

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    lastname: string;

    @ApiProperty({required:false})
    @IsCompanyEmail()
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({required:false})
    @IsPasswordValid()
    @IsOptional()
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({required:false})
    @IsEnum(UserRole, { each: true })
    @IsOptional()
    roles: UserRole[];
}