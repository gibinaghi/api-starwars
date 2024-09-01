import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from '../services/movie.service';
import { Response } from 'express';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';
import { mock, MockProxy } from 'jest-mock-extended';
import { ResponseDto } from '@app/core/utils/set-response.utils';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MockProxy<MovieService>;

  beforeEach(async () => {
    service = mock<MovieService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('syncWithStarWarsAPI', () => {
    it('should sync with Star Wars API and return the result', async () => {
      const mockResponse: ResponseDto = {
        code: 200,
        data: 'some data',
        error: null,
        message: null,
      };
      service.syncWithStarWarsAPI.mockResolvedValue(mockResponse);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.syncWithStarWarsAPI(res);

      expect(service.syncWithStarWarsAPI).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const mockResponse = { code: 200, data: 'movies data' };
      service.getAllMovies.mockResolvedValue(mockResponse as any);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAllMovies(res);

      expect(service.getAllMovies).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('getMovieById', () => {
    it('should return movie by id', async () => {
      const mockResponse = { code: 200, data: 'single movie data' };
      service.getMovieById.mockResolvedValue(mockResponse as any);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const id = 1;

      await controller.getMovieById(res, id);

      expect(service.getMovieById).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {
      const mockResponse = { code: 200, data: 'created movie' };
      service.createMovie.mockResolvedValue(mockResponse as any);

      const createMovieDto: CreateMovieDto = { title: 'New Movie' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await controller.createMovie(res, createMovieDto);

      expect(service.createMovie).toHaveBeenCalledWith(createMovieDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse as any);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      const mockResponse = { code: 200, data: 'updated movie' };
      service.updateMovie.mockResolvedValue(mockResponse as any);

      const updateMovieDto: UpdateMovieDto = { title: 'Updated Movie' };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const id = 1;

      await controller.updateMovie(res, id, updateMovieDto);

      expect(service.updateMovie).toHaveBeenCalledWith(id, updateMovieDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', async () => {
      const mockResponse = { code: 200, data: 'deleted movie' };
      service.deleteMovie.mockResolvedValue(mockResponse as any);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      const id = 1;

      await controller.daleteMovie(res, id);

      expect(service.deleteMovie).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });
});
