import { Module, forwardRef } from '@nestjs/common';
import { TrackingtimeService } from './trackingtime.service';
import { TrackingtimeController } from './trackingtime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trackingtime } from './entities/trackingtime.entity';
import { ClientModule } from 'src/client/client.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Trackingtime]),
    ClientModule,
  ],
  controllers: [TrackingtimeController],
  providers: [TrackingtimeService],
  exports: [TrackingtimeService],
})
export class TrackingtimeModule {}
