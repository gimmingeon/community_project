import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Role } from "../type/userRole.type";
import { Post } from "../../post/entities/post.entity";
import { PostComment } from "src/post-comment/entities/post-comment.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @IsEmail({}, { message: "이메일 형식에 맞지 않습니다." })
    @IsNotEmpty()
    @Column({ type: "varchar", unique: true, nullable: false })
    email: string;

    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    @IsStrongPassword({}, {message: '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자를 포함해야 합니다.'})
    @Column({ type: 'varchar', select: false, nullable: false })
    password: string;

    @IsNotEmpty({message: '닉네임을 입력해주세요.'})
    @IsString()
    @Column({ type: 'varchar', unique: true, nullable: false })
    nickname: string;

    @IsEnum(Role)
    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @Column({ type: 'varchar', nullable: true })
    image_url?: string;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updated_at: Date;

    @OneToMany(() => Post, (post) => post.user, {cascade:true})
    post: Post[];

    @OneToMany(() => PostComment, (postComment) => postComment.user, {cascade: true})
    postComment: PostComment[];
}
