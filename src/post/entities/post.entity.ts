import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from '../../challenge/entities/challenge.entity';

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  post: string;

  @Column({ nullable: false })
  caption: string;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category' })
  category: Category;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.posts)
  @JoinColumn({ name: 'challengeId' })
  challengeId: Challenge;

  @Column({ nullable: false })
  points: number;

  @Column({
    type: 'enum',
    enum: MediaType,
    nullable: false,
  })
  mediaType: MediaType;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
