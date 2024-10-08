import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {

    const data = await this.userService.signUp(signUpDto);
    return {statusCode: HttpStatus.CREATED, message: '회원가입이 되었습니다.', data};
  }
}
