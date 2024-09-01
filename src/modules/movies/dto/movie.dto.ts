import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import genericsDoc from '../../../common/documentation/modules/gererics/dto/generic.dto';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(genericsDoc.createMovieDto.title)
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.createMovieDto.episode_id)
  episode_id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.createMovieDto.opening_crawl)
  opening_crawl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.createMovieDto.director)
  director?: string;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.createMovieDto.producer)
  producer?: string;
}

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.updateMovieDto.title)
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.updateMovieDto.episode_id)
  episode_id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.updateMovieDto.opening_crawl)
  opening_crawl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.updateMovieDto.director)
  director?: string;

  @IsString()
  @IsOptional()
  @ApiProperty(genericsDoc.updateMovieDto.producer)
  producer?: string;
}
