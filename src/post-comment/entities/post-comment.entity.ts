import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: "post_comments" })
export class PostComment {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: "int", nullable: false, unsigned: true })
    postId: number;

    @Column({ type: "int", nullable: false, unsigned: true })
    userId: number;

    @Column({ type: "varchar", nullable: false })
    user_nickname: string;

    @Column({ type: 'varchar', nullable: false, default: '' })
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.postComment)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Post, (post) => post.postComment, {onDelete: 'CASCADE',})
    @JoinColumn()
    post: Post;
}
