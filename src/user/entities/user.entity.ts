import { Post } from '../../post/entities/post.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

export enum UserStatus {
  ACTIVE = 'Active',
  BLOCKED = 'Blocked',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: false })
  profile: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ default: 0 })
  point: number;

  @Column({ default: true })
  isNotificationSend: boolean;

  @Column({ nullable: true })
  deviceType?: string;

  @Column({ nullable: true })
  deviceToken?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true })
  deleteReason?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
