import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Logger from '../../configurations/configLogs/winston.logs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const ex = exception.getResponse();
    Logger.error(
      JSON.stringify({
        exception,
        url: request.originalUrl,
      }),
    );

    // ========== Select url path to set patternController ============ //
    let url = request.originalUrl.split('/')[3];
    if (url && url.includes('?')) url = url.split('?')[0];

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url && request.url != '/' ? request.url : `/api/v1/${url}`,
      error: true,
      status,
      message: ex ? ex['message'] : exception.message,
    });
  }
}
