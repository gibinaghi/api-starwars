import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../core/entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';
import { CronService } from './services/cron-movie.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../authorization/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Movie]),
    AuthModule,
  ],
  providers: [MovieRepository, MovieService, CronService],
  controllers: [MovieController],
  exports: [],
})
export class MovieModule {}
