import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingtimeModule } from 'src/trackingtime/trackingtime.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        forwardRef(() => TrackingtimeModule),
        TypeOrmModule.forFeature([User]),
    ],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
