import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Authentification')
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      return await this.authService.login(authLoginDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
