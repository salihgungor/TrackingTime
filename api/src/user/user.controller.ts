import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDTO } from 'src/user/dto/update-password.dto';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserService } from 'src/user/user.service';
import { UpdateTrackingtimeDto } from 'src/trackingtime/dto/update-trackingtime.dto';
import { TrackingtimeState } from 'src/trackingtime/entities/trackingtime.entity';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from './entities/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(UserRole.ADMIN)
  async getUsers() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(UserRole.ADMIN)
  async findUsersById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      } else {
        return user;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(UserRole.ADMIN)
  async createUsers(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id/trackingtimes')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async getUsersTrackingtimes(@Param('id', ParseIntPipe) id: number) {
    let trackingtimes = [];
    try {
      await this.userService.findOne(id).then((user) => {
        if (!user)
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        trackingtimes = user.trackingtimes;
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

    return trackingtimes;
  }

  @Get(':id/trackingtimes/:id_tt')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async getOneTrackingtime(@Param() params: any) {
    let trackingtime;
    try {
      await this.userService.findOne(params.id).then((user) => {
        if (!user)
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        trackingtime = user.trackingtimes.find((tt) => tt.id == params.id_tt);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    if (!trackingtime)
      throw new HttpException(
        `Trackingtime ${params.id_tt} not found`,
        HttpStatus.NOT_FOUND,
      );
    return trackingtime;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDTO,
  ) {
    if (Object.keys(updateUser).length === 0)
      throw new HttpException(
        'There is no fields to update.',
        HttpStatus.BAD_REQUEST,
      );
    try {
      const user = await this.userService.findOne(id);
      if (!user)
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      return this.userService.updateUser(user, updateUser);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id/reset-password')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async resetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordUser: UpdatePasswordDTO,
  ) {
    try {
      const user = await this.userService.findOne(id);
      if (!user)
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      return this.userService.setPassword(user, updatePasswordUser);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id/trackingtimes/:id_tt')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async updateTrackingtime(
    @Param('id_tt', ParseIntPipe) id_tt: number,
    @Body() updateTrackingtimeDto: UpdateTrackingtimeDto,
  ) {
    if (Object.keys(updateTrackingtimeDto).length === 0)
      throw new HttpException(
        'There is no fields to update.',
        HttpStatus.BAD_REQUEST,
      );
    try {
      return await this.userService.updateTrackingtimeById(
        id_tt,
        updateTrackingtimeDto,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id/trackingtimes/id_tt')
  @Roles(UserRole.ADMIN, UserRole.USER)
  async deleteOneTrackingtime(@Param() params: any) {
    let trackingtime;
    try {
      await this.userService.findOne(params.id).then((user) => {
        if (!user)
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        trackingtime = user.trackingtimes.find((tt) => tt.id == params.id_tt);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    if (!trackingtime)
      throw new HttpException(
        `Trackingtime ${params.id_tt} not found`,
        HttpStatus.NOT_FOUND,
      );
    if (trackingtime.status !== TrackingtimeState.ON_PENDING)
      throw new HttpException(
        `Trackingtime ${params.id_tt} can't be deleted because it's validated.`,
        HttpStatus.NOT_FOUND,
      );
    return await this.userService.removeOneTrackingtime(params.id_tt);
  }
}
