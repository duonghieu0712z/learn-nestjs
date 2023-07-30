import { plainToClass } from '@nestjs/class-transformer';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { Observable, map } from 'rxjs';

type ClassType<T> = new (...args: any[]) => T;

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<any, T | T[] | PaginateResult<T>>
{
  constructor(private readonly classType: ClassType<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<T | T[] | PaginateResult<T>> {
    return next.handle().pipe(
      map((data) => {
        const result = data as PaginateResult<any>;
        if (result.docs) {
          result.docs = plainToClass(this.classType, result.docs);
          return result;
        }

        return plainToClass(this.classType, data);
      }),
    );
  }
}
