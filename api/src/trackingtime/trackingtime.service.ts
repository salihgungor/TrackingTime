import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { UserService } from 'src/user/user.service';
import { ClientService } from 'src/client/client.service';
import { Repository } from 'typeorm';
import { CreateTrackingtimeDto } from './dto/create-trackingtime.dto';
import { UpdateStateDto } from './dto/update-trackingtime-state.dto';
import { UpdateTrackingtimeDto } from './dto/update-trackingtime.dto';
import { Trackingtime, TrackingtimeState } from './entities/trackingtime.entity';

@Injectable()
export class TrackingtimeService {
  constructor(
    @InjectRepository(Trackingtime) private trackingtimeRepository: Repository<Trackingtime>,
    private clientService: ClientService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) { }

  async create(id_user: number, createTrackingtimeDto: CreateTrackingtimeDto) {
    const nbDaysByPeriod = this.getPeriodDays(createTrackingtimeDto.start_date, createTrackingtimeDto.end_date);
    const totalDays = this.getTotalInDays(createTrackingtimeDto.nbDays, createTrackingtimeDto.nbHalfDays, createTrackingtimeDto.nbHours);
    if ((createTrackingtimeDto.end_date < createTrackingtimeDto.start_date)) {
      throw new HttpException("The end date is greater than the start date.", 400);
    }
    if (totalDays > nbDaysByPeriod) {
      throw new HttpException("The total of day is greater than the total of period days.", 400);
    }

    let client = await this.clientService.findOne(createTrackingtimeDto.clientId);
    let user = await this.userService.findOne(id_user);

    if (!user) {
      throw new HttpException("The user is not found.", 404)
    }
    if (!client) {
      throw new HttpException("The client is not found.", 404)
    }

    const newTrackingtime = new Trackingtime();
    newTrackingtime.start_date = createTrackingtimeDto.start_date;
    newTrackingtime.end_date = createTrackingtimeDto.end_date;
    newTrackingtime.nbDays = createTrackingtimeDto.nbDays;
    newTrackingtime.nbHalfDays = createTrackingtimeDto.nbHalfDays;
    newTrackingtime.nbHours = createTrackingtimeDto.nbHours;
    newTrackingtime.companyComment = createTrackingtimeDto.companyComment;
    newTrackingtime.clientComment = createTrackingtimeDto.clientComment;

    newTrackingtime.client = client;
    newTrackingtime.user = user;

    return await newTrackingtime.save();
  }

  async findAll() {
    return await this.trackingtimeRepository.createQueryBuilder('trackingtime')
      .leftJoinAndSelect("trackingtime.user", "user")
      .leftJoinAndSelect("trackingtime.client", "client")
      .getMany()
  }

  async findOne(id: number) {
    return await this.trackingtimeRepository.createQueryBuilder('trackingtime')
      .leftJoinAndSelect("trackingtime.user", "user")
      .leftJoinAndSelect("trackingtime.client", "client")
      .where('trackingtime.id = :id', { id: id })
      .getOne()
  }


  //for user
  async update(id: number, updateTrackingtimeDto: UpdateTrackingtimeDto): Promise<CreateTrackingtimeDto | UnauthorizedException> {
    const trackingtime = await this.trackingtimeRepository.findOneBy({ id });
    if (trackingtime && trackingtime.state == TrackingtimeState.ON_PENDING) {
      const result = await this.trackingtimeRepository.createQueryBuilder()
        .update(updateTrackingtimeDto)
        .where({
          id: id,
        })
        .returning('*')
        .execute()
      return result.raw[0];
    }
    return new UnauthorizedException("You can't change if it is not on pending.")
  }

  async remove(id: number) {
    const trackingtime = await this.trackingtimeRepository.findOneBy({ id });
    if (!trackingtime) throw new HttpException("Trackingtime not found", HttpStatus.NOT_FOUND);
    return this.trackingtimeRepository.delete({ id });
  }

  updateState(id: number, updateState: UpdateStateDto) {
    return this.trackingtimeRepository.update({ id }, updateState)
  }

  getPeriodDays(start_date: Date, end_date: Date): Number {
    return moment(end_date).diff(moment(start_date), 'days') + 1;
  }

  getTotalInDays(days: string, halfDays: string, hours: string): Number {
    return parseInt(days) + (parseInt(halfDays) * 0.5) + (parseInt(hours) / 24)
  }
}
