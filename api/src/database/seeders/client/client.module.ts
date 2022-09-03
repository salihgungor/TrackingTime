import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { ClientSeederService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientSeederService],
  exports: [ClientSeederService],
})
export class ClientSeederModule {}
