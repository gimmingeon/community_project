import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {

    @IsEmail({}, { message: "이메일 형식에 맞지 않습니다." })
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    email: string

    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    @IsStrongPassword({}, {message: '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자를 포함해야 합니다.'})
    password: string;

    @IsNotEmpty({message: '닉네임을 입력해주세요.'})
    @IsString()
    nickname: string;
    
    @IsNotEmpty({message: '비밀번호 확인을 입력해주세요.'})
    @IsString()
    passwordConfirm: string; 

}