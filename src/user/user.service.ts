import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    async signUp({email, nickname, password, passwordConfirm}: SignUpDto) {

        const exitedUser = await this.userRepository.findOneBy({email})
        if(exitedUser) {
            throw new BadRequestException('이미 존재하는 이메일입니다.');
        }

        const exitednickname = await this.userRepository.findOneBy({nickname});
        if(exitednickname) {
            throw new BadRequestException('이미 존재하는 닉네임입니다.');
        }

        if (password !== passwordConfirm) {
            throw new BadRequestException('비밀번호와 비밀번호 확인이 다릅니다.');
        }

        const hashRound = this.configService.get<number>('PASSWORD_HASH_ROUND');
        const hashedPassword = await bcrypt.hash(password, hashRound);

        const user = await this.userRepository.save({
            email, 
            nickname, 
            password : hashedPassword
        });
        delete user.password;
        
        return user;
  }
  
}
