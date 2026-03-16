import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('otp')
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  otp: string;

  @Column({ nullable: false })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
