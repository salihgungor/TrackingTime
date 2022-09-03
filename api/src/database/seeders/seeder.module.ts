import { Module, Logger } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { ClientSeederModule } from './client/client.module';
import { Seeder } from './seeder.service';
import { UserSeederModule } from './user/user.module';

@Module({
  imports: [AppModule, UserSeederModule, ClientSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
