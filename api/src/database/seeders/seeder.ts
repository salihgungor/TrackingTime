import { Injectable, Logger } from "@nestjs/common";
import { UserSeederService } from "./user/user.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly languageSeederService: UserSeederService,
  ) {}
  async seed() {
    await this.users()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async users() {
    return await Promise.all(this.languageSeederService.create())
      .then(createdLanguages => {
        this.logger.debug(
          'No. of users created : ' +
            createdLanguages.filter(
              nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}