import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { IUser } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import { users } from './data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.userRepository
        .findOneBy({ email: user.email })
        .then((result) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (result) {
            return Promise.resolve(null);
          }
          const newUser = this.userRepository.create(user);
          return this.userRepository.save(newUser);
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
