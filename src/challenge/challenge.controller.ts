import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import {
  CreateChallengeDto,
  ListChallengeDto,
} from './dto/create-challenge.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('post', {
      storage: diskStorage({
        destination: './public/uploads/images',
        filename(req, file, callback) {
          const name = Date.now();

          callback(null, name + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() createChallengeDto: CreateChallengeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createChallengeDto.post = file.filename;
    }
    return this.challengeService.create(createChallengeDto);
  }

  @Post('list')
  async findAll(@Body() listChallengeDto: ListChallengeDto) {
    const data = await this.challengeService.findAll(listChallengeDto);

    const list = data.list ?? [];
    const totalRecords = data.totalRecords ?? 0;

    return { list, totalRecords };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeService.remove(+id);
  }
}
