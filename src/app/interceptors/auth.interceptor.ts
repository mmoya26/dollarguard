import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  console.log('Request is being intercepted...');

  const requestWithCredentials = req.clone({
    withCredentials: true
  });

  return next(requestWithCredentials).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status == 401) {
        authService.handleUnauthorizedAccess();
      }
      
      return throwError(() => e);
    })
  );
};
