import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OtpService } from 'src/otp/otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Otp } from '.././otp/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp])],
  controllers: [UserController],
  providers: [UserService, OtpService],
})
export class UserModule {}
