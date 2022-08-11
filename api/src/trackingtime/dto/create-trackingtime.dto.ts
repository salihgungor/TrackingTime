import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTrackingtimeDto {

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    start_date:Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    end_date:Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @ValidateIf(trackingtime => trackingtime.nbHalfDays == undefined && trackingtime.nbHours == undefined)
    nbDays:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @ValidateIf(trackingtime => trackingtime.nbDays == undefined && trackingtime.nbHours == undefined)
    nbHalfDays:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @ValidateIf(trackingtime => trackingtime.nbHalfDays == undefined && trackingtime.nbDays == undefined)
    nbHours:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyComment:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    clientComment:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    clientId:number;
}
