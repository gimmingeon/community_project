import { IsEmail, IsEnum } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../type/userRole.type";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail({}, { message: "이메일 형식에 맞지 않습니다." })
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
}
