import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../strategies/jwt-auth.guard';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import genericsDoc from '../../../common/documentation/modules/gererics/endpoints/generics.endpoint';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({
    summary: genericsDoc.signin.operation.summary,
    description: genericsDoc.signin.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.signin.response[200],
  })
  @ApiForbiddenResponse({
    description: genericsDoc.signin.response[403],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.signin.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.signin.response[409],
  })
  async singIn(
    @Res() res: Response,
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<any> {
    const out = await this._authService.singIn(loginCredentialsDto);
    return res.status(out.code).json(out);
  }

  @Get('/signout/:id')
  @ApiOperation({
    summary: genericsDoc.signout.operation.summary,
    description: genericsDoc.signout.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.signout.response[200],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.signout.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.signout.response[409],
  })
  @UseGuards(JwtAuthGuard)
  async singOut(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const out = await this._authService.singOut(id);
    return res.status(out.code).json(out);
  }
}
