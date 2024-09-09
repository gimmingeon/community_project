import { IsEnum } from "class-validator";
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

    @Column({ type: "varchar", unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', select: false, nullable: false })
    password: string;

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
