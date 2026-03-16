import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}
  async create(createOtpDto: CreateOtpDto) {
    const { email } = createOtpDto;
    const otpExists = await this.otpRepository.find({
      where: { email: email },
    });
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    let otpCreate;
    if (otpExists.length > 0) {
      otpCreate = this.otpRepository.update(
        { email: email },
        {
          otp: otp.toString(),
        },
      );
    } else {
      otpCreate = this.otpRepository.create({
        email,
        otp: otp.toString(),
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.otpRepository.save(otpCreate);
  }
}
