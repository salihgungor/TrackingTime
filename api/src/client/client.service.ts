import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
  ) {}
  create(createClientDto: CreateClientDto):Promise<Client> {
    const newClient = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(newClient);
  }

  findAll():Promise<Client[]> {
    return this.clientRepository.find();
  }

  findOne(id: number):Promise<Client> {
    return this.clientRepository.findOneBy({id});
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update({id},updateClientDto);
  }

  remove(id: number) {
    return this.clientRepository.delete({id});
  }
}
