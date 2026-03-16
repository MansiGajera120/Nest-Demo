import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
export enum MediaType {
  Image = 'image',
  Video = 'video',
}
export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  category: string;

  @IsEnum(MediaType)
  mediaType: MediaType;

  @IsNumber()
  @IsNotEmpty()
  pointValue: number;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  post: string;
}

export class ListChallengeDto {
  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
