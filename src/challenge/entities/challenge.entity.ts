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
  OneToMany,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Expose } from 'class-transformer';

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  post: string;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => Category, (category) => category.challenges)
  @JoinColumn({ name: 'category' })
  category: Category;

  @Column({ nullable: false })
  pointValue: number;

  @Column({
    type: 'enum',
    enum: MediaType,
    nullable: false,
  })
  mediaType: MediaType;

  @Column({ nullable: false })
  startDate: Date;

  @Column({ nullable: false })
  endDate: Date;

  @Column({ default: null })
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Post, (post) => post.challengeId)
  posts: Post[];

  @Expose()
  get status(): string {
    return this.endDate < new Date() ? 'Expired' : 'Active';
  }

  @Expose()
  get challenge_post(): string {
    return 'http://localhost.com/public/uploads/images/' + this.post;
  }
}
