import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ResponseUtil, {
  ResponseDto,
} from '../../../core/utils/set-response.utils';
import { MovieRepository } from '../repositories/movie.repository';
import { ApiService } from '../../../api/api.service';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';

@Injectable()
export class MovieService extends ResponseUtil {
  constructor(private _movieRepository: MovieRepository) {
    super();
  }

  /**
   * @description Get all and create movies from api
   * @returns { Promise<ResponseDto> }
   */
  async syncWithStarWarsAPI(): Promise<ResponseDto> {
    const dataApi = await ApiService.apiGetMovies();
    for (const movie of dataApi.data.results) {
      const existMovie = await this._movieRepository.getMovieByTitle(
        movie.title,
      );
      if (!existMovie) {
        await this._movieRepository.createMovie(movie);
      }
    }

    this.setSuccess(201, 'Peliculas creadas correctamente');
    return this.setSend();
  }

  /**
   * @description Get all movies
   * @returns { Promise<ResponseDto> }
   */
  async getAllMovies(): Promise<ResponseDto> {
    const movies = await this._movieRepository.getAllMovies();

    this.setSuccess(200, 'Ok.', movies);
    return this.setSend();
  }

  /**
   * @description Get one movie
   * @param id { number }
   * @returns { Promise<ResponseDto> }
   */
  async getMovieById(id: number): Promise<ResponseDto> {
    const movie = await this._movieRepository.getMovieById(id);
    if (!movie) {
      throw new NotFoundException('Pelicula no encontrada');
    }

    this.setSuccess(200, 'Ok.', movie);
    return this.setSend();
  }

  /**
   * @description Create movie
   * @param data { CreateMovieDto }
   * @returns { Promise<ResponseDto> }
   */
  async createMovie(data: CreateMovieDto): Promise<ResponseDto> {
    const existMovie = await this._movieRepository.getMovieByTitle(data.title);
    if (existMovie) {
      throw new NotFoundException('Pelicula ya existente');
    }

    await this._movieRepository.createMovie(data);
    this.setSuccess(201, 'Pelicula creada correctamente');
    return this.setSend();
  }

  /**
   * @description Update movie
   * @param id { number }
   * @param data { UpdateMovieDto }
   * @returns { Promise<ResponseDto> }
   */
  async updateMovie(id: number, data: UpdateMovieDto): Promise<ResponseDto> {
    if (!data || Object.keys(data).length === 0) {
      throw new ForbiddenException('Se debe indicar algún campo a actualizar');
    }
    const existMovie = await this._movieRepository.getMovieById(id);
    if (!existMovie) {
      throw new NotFoundException('Pelicula no encontrada');
    }

    if (data.title) {
      const existMovie = await this._movieRepository.getMovieByTitle(
        data.title,
      );
      if (existMovie) {
        throw new ForbiddenException('Pelicula ya existente');
      }
    }

    await this._movieRepository.updateMovie(id, data);
    this.setSuccess(200, 'Pelicula actualizada correctamente');
    return this.setSend();
  }

  /**
   * @description Delete movie
   * @param id { number }
   * @returns { Promise<ResponseDto> }
   */
  async deleteMovie(id: number): Promise<ResponseDto> {
    const existMovie = await this._movieRepository.getMovieById(id);
    if (!existMovie) {
      throw new NotFoundException('Pelicula no encontrada');
    }

    await this._movieRepository.deleteMovie(id);

    this.setSuccess(200, 'Pelicula eliminada correctamente');
    return this.setSend();
  }
}
