import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from 'src/user/entities/user.entity';

@ApiTags('Client')
@ApiBearerAuth()
@Controller('client')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      return await this.clientService.create(createClientDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get()
  async findAll() {
    try {
      return await this.clientService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.clientService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    if (Object.keys(updateClientDto).length === 0)
      throw new HttpException(
        'There is no fields to update.',
        HttpStatus.BAD_REQUEST,
      );
    try {
      return this.clientService.update(+id, updateClientDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.clientService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Roles(UserRole.ADMIN)
  @Get(':id/trackingtimes')
  async getOneTrackingtime(@Param('id') id: number) {
    let trackingtime = [];
    try {
      await this.clientService.findOne(id).then((client) => {
        if (!client)
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        trackingtime = client.trackingtimes;
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    return trackingtime;
  }
}
