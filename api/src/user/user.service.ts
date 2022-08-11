import { Inject, Injectable, forwardRef, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDTO } from 'src/user/dto/update-password.dto';
import { UpdateUserDTO } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateTrackingtimeDto } from 'src/trackingtime/dto/create-trackingtime.dto';
import { UpdateTrackingtimeDto } from 'src/trackingtime/dto/update-trackingtime.dto';
import { TrackingtimeService } from 'src/trackingtime/trackingtime.service';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => TrackingtimeService))
    private readonly trackingtimeService: TrackingtimeService,
  ) {}
      
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser).catch((e) => {
      if (e.code === '23505') {
        throw new UnauthorizedException(
          'Account with this email already exist.',
        ); 
      }
      return e;
    });
  }
      
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({email});
  }

  remove(id:number){
    return this.userRepository.delete({id});
  }

  async removeOneTrackingtime(id_tt:number){
    return await this.trackingtimeService.remove(id_tt);
  }

  async updateUser(user:User,updateUserDTO:UpdateUserDTO){
    if(updateUserDTO.password) {updateUserDTO.password = await this.hashPassword(updateUserDTO.password)};
    return await this.userRepository.update({"id":user.id},updateUserDTO).catch((e) => {
        if (e.code === '23505') {
          throw new UnauthorizedException(
            'Account with this email already exist.',
          ); 
        }
        return e;
      });
  }

  //update user's trackingtime by id 
  async updateTrackingtimeById(id:number, updateTrackingtimeDto: UpdateTrackingtimeDto): Promise<CreateTrackingtimeDto|UnauthorizedException> {
    return await this.trackingtimeService.update(id,updateTrackingtimeDto);
  }

  async setPassword(user:User,updatePasswordDTO:UpdatePasswordDTO){
    if(updatePasswordDTO.password !== updatePasswordDTO.passwordConfirm){
      throw new UnauthorizedException("The new password and the confirm password are different.")
    }
    if(user.validatePassword(updatePasswordDTO.password)){
      throw new UnauthorizedException("The current and the new password is the same.")
    }
    const newPasswordHashed = await this.hashPassword(updatePasswordDTO.password);
    return await this.userRepository.update({"id":user.id},{"password":newPasswordHashed});
  }

  async hashPassword(password:string){
      return await bcrypt.hash(password,8);
  }
}