import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IClient } from 'src/interfaces/client.interface';
import { Client } from 'src/client/entities/client.entity';

export class UpdateTrackingtimeDto {
  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start_date?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end_date?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nbDays?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nbHalfDays?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nbHours?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  companyComment?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  clientComment?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  client?: Client;
}
