import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TrackingtimeService } from './trackingtime.service';
import { CreateTrackingtimeDto } from './dto/create-trackingtime.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateStateDto } from './dto/update-trackingtime-state.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from 'src/user/entities/user.entity';

@ApiTags('Trackingtimes')
@ApiBearerAuth()
@Controller('trackingtimes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TrackingtimeController {
  constructor(private readonly trackingtimeService: TrackingtimeService) {}

  @Roles(UserRole.USER)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createTrackingtimeDto: CreateTrackingtimeDto,
  ) {
    try {
      return await this.trackingtimeService.create(
        req.user['sub'],
        createTrackingtimeDto,
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.trackingtimeService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const trackingtime = await this.trackingtimeService.findOne(+id);
      if (!trackingtime)
        throw new HttpException('Trackingtime not found', HttpStatus.NOT_FOUND);
      return trackingtime;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateState(@Param('id') id: string, @Body() updateState: UpdateStateDto) {
    if (Object.keys(updateState).length === 0)
      throw new HttpException(
        'There is no fields to update.',
        HttpStatus.BAD_REQUEST,
      );
    try {
      return this.trackingtimeService.updateState(+id, updateState);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.trackingtimeService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
