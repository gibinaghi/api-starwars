import { Injectable } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Movie } from '../../../core/entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly _movieRepository: Repository<Movie>,
  ) {}

  /**
   * ==========================================================
   * @Description Get all movies
   * ==========================================================
   */
  async getAllMovies(): Promise<Movie[]> {
    try {
      return await this._movieRepository.find();
    } catch (e) {
      throw new ConflictException('Error interno Movie');
    }
  }

  /**
   * ==========================================================
   * @Description Get movie by id
   * ==========================================================
   */
  async getMovieByTitle(title: string): Promise<Movie> {
    try {
      return await this._movieRepository.findOne({ where: { title } });
    } catch (e) {
      throw new ConflictException('Error interno Movie');
    }
  }

  /**
   * ==========================================================
   * @Description Get movie by id
   * ==========================================================
   */
  async getMovieById(id: number): Promise<Movie> {
    try {
      return await this._movieRepository.findOne({ where: { id } });
    } catch (e) {
      throw new ConflictException('Error interno Movie');
    }
  }

  /**
   * ==========================================================
   * @Description Create Movie
   * ==========================================================
   */
  async createMovie(data: any): Promise<void> {
    try {
      await this._movieRepository.save(data);
    } catch (e) {
      throw new ConflictException('Error interno Movie');
    }
  }

  /**
   * ==========================================================
   * @Description Update Movie
   * ==========================================================
   */
  async updateMovie(id: number, data: any): Promise<void> {
    try {
      await this._movieRepository.update(id, data);
    } catch (e) {
      throw new ConflictException('Error interno Movie');
    }
  }

  /**
   * ==========================================================
   * @Description Delete Movie
   * ==========================================================
   */
  async deleteMovie(id: number): Promise<void> {
    try {
      await this._movieRepository.delete(id);
    } catch (e) {
      throw new ConflictException('Error interno Movie');
    }
  }
}
