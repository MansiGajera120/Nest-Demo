import { Injectable } from '@nestjs/common';
import {
  CreateChallengeDto,
  ListChallengeDto,
} from './dto/create-challenge.dto';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}
  async create(createChallengeDto: CreateChallengeDto) {
    const {
      title,
      category,
      mediaType,
      pointValue,
      startDate,
      endDate,
      description,
      post,
    } = createChallengeDto;

    const createChallenge = this.challengeRepository.create({
      title,
      category: { id: category },
      mediaType,
      pointValue,
      startDate,
      endDate,
      description,
      post,
    });
    return this.challengeRepository.save(createChallenge);
  }

  async findAll(listChallengeDto: ListChallengeDto): Promise<{
    list: Challenge[];
    totalRecords: number;
  }> {
    const { offset, limit } = listChallengeDto;
    const [list, totalRecords] = await this.challengeRepository
      .createQueryBuilder('challenges')
      .leftJoin('challenges.category', 'category')
      .addSelect(['category.name', 'category.id'])
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { list, totalRecords };
  }

  async findOne(id: string) {
    const challenge = await this.challengeRepository.findOne({ where: { id } });
    return challenge;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
