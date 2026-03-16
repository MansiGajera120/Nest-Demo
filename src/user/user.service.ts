import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Otp } from 'src/otp/entities/otp.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, otpCode } = createUserDto;
    const isOtpMatch = this.otpRepository.find({
      where: { otp: otpCode, email },
    });

    if ((await isOtpMatch).length === 0) {
      throw new NotFoundException('Opt not match');
    }

    await this.otpRepository.delete({ email });
    const userExists = await this.userRepository.findOne({
      where: { email: email },
    });

    if (userExists) {
      throw new BadRequestException('this email is already register');
    }
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    const user = await this.userRepository.find();
    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: id })
      .execute();

    return updatedUser;
  }

  async deleteAccount(id: string) {
    const deleteAccount = await this.userRepository
      .createQueryBuilder()
      .softDelete()
      .from(User)
      .where('id = :id', { id: id })
      .execute();
    return deleteAccount;
  }
}
