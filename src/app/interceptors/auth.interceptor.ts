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
    catchError((e) => {
      if (e.status == 401) {
        // Add in the future maybe query params to tell the user they have been logged out for a reason
        router.navigate(['/login']);
        authService.clearAuthStatus();
      }
      
      return throwError(() => e);
    })
  );
};
