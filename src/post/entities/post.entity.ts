import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { PostComment } from "src/post-comment/entities/post-comment.entity";

@Entity({ name: "posts" })
export class Post {

    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column({ type: "int", nullable: false, unsigned: true })
    userId: number;

    @Column({ type: "varchar", nullable: false })
    user_nickname: string;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "varchar", nullable: false })
    content: string;

    @Column({ type: "varchar", nullable: true })
    image?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn() // 조인컬럼이 있는쪽이 외래키를 가진다
    user: User;

    @OneToMany(() => PostComment, (postComment) => postComment.post, {cascade: true})
    postComment: PostComment[];
}
