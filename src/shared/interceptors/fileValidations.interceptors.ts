import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { unlink } from 'fs';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class FileValidationsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException) {
          const request = context.switchToHttp().getRequest();
          const file = request.file;
          if (file) {
            unlink(file.path, (unlinkError) => {
              if (unlinkError) {
                console.log('Error deleting file', unlinkError);
              }
            });
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
