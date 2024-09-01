import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import genericsDoc from '../../../common/documentation/modules/gererics/endpoints/generics.endpoint';
import { MovieService } from '../services/movie.service';
import { JwtAuthGuard } from '../../../modules/authorization/strategies/jwt-auth.guard';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { RoleEnum } from '../../../common/enums/roles.enums';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private _movieService: MovieService) {}

  @Get('/sync')
  @ApiOperation({
    summary: genericsDoc.sync.operation.summary,
    description: genericsDoc.sync.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.sync.response[200],
  })
  @ApiConflictResponse({
    description: genericsDoc.sync.response[409],
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async syncWithStarWarsAPI(@Res() res: Response): Promise<any> {
    const v = await this._movieService.syncWithStarWarsAPI();
    return res.status(v.code).json(v);
  }

  @Get()
  @ApiOperation({
    summary: genericsDoc.getAllMovies.operation.summary,
    description: genericsDoc.getAllMovies.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.getAllMovies.response[200],
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.REGULAR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllMovies(@Res() res: Response): Promise<any> {
    const v = await this._movieService.getAllMovies();
    return res.status(v.code).json(v);
  }

  @Get(':id')
  @ApiOperation({
    summary: genericsDoc.getMovieById.operation.summary,
    description: genericsDoc.getMovieById.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.getMovieById.response[200],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.getMovieById.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.getMovieById.response[409],
  })
  @Roles(RoleEnum.REGULAR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMovieById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const v = await this._movieService.getMovieById(id);
    return res.status(v.code).json(v);
  }

  @Post()
  @ApiOperation({
    summary: genericsDoc.createMovie.operation.summary,
    description: genericsDoc.createMovie.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.createMovie.response[200],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.createMovie.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.createMovie.response[409],
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createMovie(
    @Res() res: Response,
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<any> {
    const v = await this._movieService.createMovie(createMovieDto);
    return res.status(v.code).json(v);
  }

  @Patch(':id')
  @ApiOperation({
    summary: genericsDoc.updateMovie.operation.summary,
    description: genericsDoc.updateMovie.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.updateMovie.response[200],
  })
  @ApiForbiddenResponse({
    description: genericsDoc.updateMovie.response[403],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.updateMovie.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.updateMovie.response[409],
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateMovie(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<any> {
    const v = await this._movieService.updateMovie(id, updateMovieDto);
    return res.status(v.code).json(v);
  }

  @Delete(':id')
  @ApiOperation({
    summary: genericsDoc.deleteMovie.operation.summary,
    description: genericsDoc.deleteMovie.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.deleteMovie.response[200],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.deleteMovie.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.deleteMovie.response[409],
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async daleteMovie(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const v = await this._movieService.deleteMovie(id);
    return res.status(v.code).json(v);
  }
}
