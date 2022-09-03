import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { clients } from './data';
import { IClient } from 'src/interfaces/client.interface';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class ClientSeederService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  create(): Array<Promise<Client>> {
    return clients.map(async (client: IClient) => {
      return await this.clientRepository
        .findOneBy({ name: client.name })
        .then((result) => {
          if (result) {
            return Promise.resolve(null);
          }
          const newClient = this.clientRepository.create(client);
          return this.clientRepository.save(newClient);
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
