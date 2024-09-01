import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { AppService } from '../services/app.service';
import genericsDoc from '../../../common/documentation/modules/gererics/endpoints/generics.endpoint';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('generics')
@ApiTags('Generic')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  @ApiOperation({
    summary: genericsDoc.version.operation.summary,
    description: genericsDoc.version.operation.description,
  })
  @ApiCreatedResponse({
    description: genericsDoc.version.response[200],
  })
  async getApiVersionController(@Res() res: Response): Promise<any> {
    const v = await this.appService.getVersionService();
    return res.status(v.code).json(v);
  }
}
