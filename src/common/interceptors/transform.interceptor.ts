import { IPagination, Paginated } from '@common/dtos/paginated.dto';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  pagination?: IPagination;
  message: string;
  success: boolean;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    private readonly logger: Logger,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const handler = context.getHandler();
    const handlerName = handler.name;
    const customMessage = this.reflector.get<string>('decorator:message', handler);

    const mapMessage: Recordable = {
      create: 'Item created successfully',
      update: 'Item updated successfully',
      delete: 'Item deleted successfully',
      findAll: 'Data retrieved successfully',
      findOneById: 'Item retrieved successfully',
      findOneByField: 'Item retrieved successfully',
    };

    return next.handle().pipe(
      map((value) => {
        const isPaginated = value instanceof Paginated;
        const data = isPaginated ? value.items : value;
        const pagination = isPaginated ? value.pagination : null;
        const defaultMessage =
          Object.entries(mapMessage).find(([k]) => handlerName.startsWith(k))?.[1] ??
          (isPaginated ? 'Data retrieved successfully' : 'Operation successful');

        return {
          data,
          pagination: pagination || undefined,
          message: customMessage || defaultMessage,
          success: true,
          statusCode: HttpStatus.OK,
        };
      }),
      catchError((error) => {
        let message = error.message || 'An unexpected error occurred';
        const errors = error.response?.errors || [];
        const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
          this.logger.error(error);
          message = 'Internal server error';
        }

        return throwError(
          () =>
            new HttpException(
              {
                success: false,
                message,
                errors: Array.isArray(errors) ? errors : [errors],
                statusCode: status,
              },
              status,
            ),
        );
      }),
    );
  }
}
