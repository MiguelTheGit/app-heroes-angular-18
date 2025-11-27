import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  return next(req).pipe(
    catchError((error) => {
      const message = error.status === 0
        ? 'Unable to connect to the server.'
        : `Error ${error.status}: ${error.message}`;

      errorService.setError(message);

      return throwError(() => error);
    })
  );

};
