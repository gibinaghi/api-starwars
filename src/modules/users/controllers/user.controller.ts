import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
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
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../../modules/authorization/strategies/jwt-auth.guard';
import { Roles } from '@app/core/decorators/roles.decorator';
import { RoleEnum } from '@app/common/enums/roles.enums';
import { RolesGuard } from '@app/core/guards/roles.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: genericsDoc.createUser.operation.summary,
    description: genericsDoc.createUser.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.createUser.response[200],
  })
  @ApiForbiddenResponse({
    description: genericsDoc.createUser.response[403],
  })
  @ApiNotFoundResponse({
    description: genericsDoc.createUser.response[404],
  })
  @ApiConflictResponse({
    description: genericsDoc.createUser.response[409],
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.REGULAR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    const v = await this._userService.createUser(createUserDto);
    return res.status(v.code).json(v);
  }
}
