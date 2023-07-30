import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseResponse } from 'src/common/base-response';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const status = this.getStatus(exception);
    const message = this.getMessage(exception);
    const body = new BaseResponse(null, status, message);

    httpAdapter.reply(ctx.getResponse(), body, status);
  }

  getStatus(exception: any) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getMessage(exception: any) {
    let message: string | string[];
    switch (true) {
      case exception instanceof HttpException:
        message = exception.getResponse().message;
        break;
      case exception instanceof Error:
        message = exception.message;
        break;
      default:
        message = 'Internal server error';
        break;
    }
    return message;
  }
}
