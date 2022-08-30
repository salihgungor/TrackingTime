import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DateTime } from 'luxon';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exResp = exception.getResponse();
    response.status(status).json({
      code: status,
      timestamp: DateTime.now().toFormat('yyyy-MM-DD hh:mm:ss'),
      path: request.url,
      method: request.method,
      message: exResp['message'] ? exResp['message'] : exception.message,
    });
  }
}
