import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  
  console.log('Request is being intercepted...');

  const requestWithCredentials = req.clone({
    withCredentials: true,    
  });

  return next(requestWithCredentials).pipe(
    catchError((e) => {
      if(e.status === 401 && !req.url.includes('/login')) {
        authService.handleUnauthorizedAccess();
      }

      return throwError(() => e)
    })
  )
};
