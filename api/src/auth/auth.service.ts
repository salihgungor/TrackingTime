import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,private jwtService:JwtService) {}

    async login(user: any) {
      const userEntity = await this.userService.findOneByEmail(user.email);
      const payload = {email: userEntity.email,sub:userEntity.id,roles:userEntity.roles};
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
      const {email,password} = authLoginDto;
      const user = await this.userService.findOneByEmail(email);
      if(!user){
        throw new UnauthorizedException("No account linked to this email.")
      }else if(await user.validatePassword(password)){
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    
}
