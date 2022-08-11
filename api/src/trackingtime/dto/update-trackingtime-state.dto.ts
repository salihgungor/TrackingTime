import { IsEnum, NotEquals } from "class-validator";
import { TrackingtimeState } from "../entities/trackingtime.entity";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateStateDto {
    @ApiProperty()
    @IsEnum(TrackingtimeState)
    @NotEquals(TrackingtimeState.ON_PENDING)
    state:TrackingtimeState;
}
