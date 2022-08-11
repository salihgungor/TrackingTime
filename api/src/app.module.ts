import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { TrackingtimeModule } from './trackingtime/trackingtime.module';
import { User } from './user/entities/user.entity';
import { Trackingtime } from './trackingtime/entities/trackingtime.entity';
import { Client } from './client/entities/client.entity';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { TypeOrmConfigService } from './config/database/typeormconfig.service';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass:TypeOrmConfigService
    }),
    AuthModule,
    ClientModule,
    TrackingtimeModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
