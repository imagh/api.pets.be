import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const mapper = (resp: any) => ({
      message: this.reflector.get<string>('responseMessage', context.getHandler()) || resp.message || '',
      statusCode: context.switchToHttp().getResponse().statusCode,
      data: resp.data || resp
    });

    return next.handle().pipe(map(mapper));
  }
}