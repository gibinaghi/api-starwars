import { MovieRepository } from '../repositories/movie.repository';
import { MovieService } from './movie.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: jest.Mocked<MovieRepository>;

  beforeEach(async () => {
    movieRepository = {
      getAllMovies: jest.fn(),
      getMovieById: jest.fn(),
      getMovieByTitle: jest.fn(),
      createMovie: jest.fn(),
      updateMovie: jest.fn(),
      deleteMovie: jest.fn(),
    } as any;

    movieService = new MovieService(movieRepository);
  });

  it('should return all movies', async () => {
    const movies = [{ id: 1, title: 'A New Hope' }];
    movieRepository.getAllMovies.mockResolvedValue(movies as any);

    const result = await movieService.getAllMovies();

    expect(movieRepository.getAllMovies).toHaveBeenCalled();
    expect(result).toEqual({
      code: 200,
      message: 'Ok.',
      data: movies,
      error: false,
    });
  });

  it('should return a movie by id', async () => {
    const movie = { id: 1, title: 'A New Hope' };
    movieRepository.getMovieById.mockResolvedValue(movie as any);

    const result = await movieService.getMovieById(1);

    expect(movieRepository.getMovieById).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      code: 200,
      message: 'Ok.',
      data: movie,
      error: false,
    });
  });

  it('should throw a NotFoundException if movie does not exist', async () => {
    movieRepository.getMovieById.mockResolvedValue(null);

    await expect(movieService.getMovieById(1)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a movie if it does not exist', async () => {
    const createMovieDto = { title: 'A New Hope' };
    movieRepository.getMovieByTitle.mockResolvedValue(null);

    const result = await movieService.createMovie(createMovieDto as any);

    expect(movieRepository.getMovieByTitle).toHaveBeenCalledWith('A New Hope');
    expect(movieRepository.createMovie).toHaveBeenCalledWith(createMovieDto);
    expect(result).toEqual({
      code: 201,
      message: 'Pelicula creada correctamente',
      data: undefined,
      error: false,
    });
  });

  it('should throw a NotFoundException if movie already exists', async () => {
    const createMovieDto = { title: 'A New Hope' };
    movieRepository.getMovieByTitle.mockResolvedValue({
      id: 1,
      title: 'A New Hope',
    } as any);

    await expect(
      movieService.createMovie(createMovieDto as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update a movie if it exists', async () => {
    const updateMovieDto = { title: 'The Empire Strikes Back' };
    movieRepository.getMovieById.mockResolvedValue({
      id: 1,
      title: 'A New Hope',
    } as any);
    movieRepository.getMovieByTitle.mockResolvedValue(null);

    const result = await movieService.updateMovie(1, updateMovieDto as any);

    expect(movieRepository.getMovieById).toHaveBeenCalledWith(1);
    expect(movieRepository.getMovieByTitle).toHaveBeenCalledWith(
      'The Empire Strikes Back',
    );
    expect(movieRepository.updateMovie).toHaveBeenCalledWith(1, updateMovieDto);
    expect(result).toEqual({
      code: 200,
      message: 'Pelicula actualizada correctamente',
      data: undefined,
      error: false,
    });
  });

  it('should throw a NotFoundException if movie does not exist', async () => {
    movieRepository.getMovieById.mockResolvedValue(null);

    await expect(
      movieService.updateMovie(1, { title: 'The Empire Strikes Back' } as any),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw a ForbiddenException if a movie with the new title already exists', async () => {
    const updateMovieDto = { title: 'The Empire Strikes Back' };
    movieRepository.getMovieById.mockResolvedValue({
      id: 1,
      title: 'A New Hope',
    } as any);
    movieRepository.getMovieByTitle.mockResolvedValue({
      id: 2,
      title: 'The Empire Strikes Back',
    } as any);

    await expect(
      movieService.updateMovie(1, updateMovieDto as any),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should delete a movie if it exists', async () => {
    movieRepository.getMovieById.mockResolvedValue({
      id: 1,
      title: 'A New Hope',
    } as any);

    const result = await movieService.deleteMovie(1);

    expect(movieRepository.getMovieById).toHaveBeenCalledWith(1);
    expect(movieRepository.deleteMovie).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      code: 200,
      message: 'Pelicula eliminada correctamente',
      data: undefined,
      error: false,
    });
  });

  it('should throw a NotFoundException if movie does not exist', async () => {
    movieRepository.getMovieById.mockResolvedValue(null);

    await expect(movieService.deleteMovie(1)).rejects.toThrow(
      NotFoundException,
    );
  });
});
