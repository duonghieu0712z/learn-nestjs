import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/common/base-response';

@Injectable()
export class ResponseHandlerInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> {
    return next
      .handle()
      .pipe(
        map(
          (data) =>
            new BaseResponse(
              data,
              context.switchToHttp().getResponse().statusCode,
              'Success',
            ),
        ),
      );
  }
}
