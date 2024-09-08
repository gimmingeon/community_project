import { PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class SignUpDto extends PickType(User, [
    'email',
    'password',
    'nickname',
]){
    @IsNotEmpty({message: '비밀번호 확인을 입력해주세요.'})
    @IsString()
    passwordConfirm: string; 

}