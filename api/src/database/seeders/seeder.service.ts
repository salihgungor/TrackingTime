import { Injectable, Logger } from '@nestjs/common';
import { ClientSeederService } from './client/client.service';
import { UserSeederService } from './user/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService,
    private readonly clientSeederService: ClientSeederService,
  ) {}
  async seed() {
    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });

    await this.clients()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding clients...');
        Promise.reject(error);
      });
  }
  async users() {
    return await Promise.all(this.userSeederService.create())
      .then((createdUsers) => {
        this.logger.debug(
          'No. of users created : ' +
            createdUsers.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async clients() {
    return await Promise.all(this.clientSeederService.create())
      .then((createdClients) => {
        this.logger.debug(
          'No. of clients created : ' +
            createdClients.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
