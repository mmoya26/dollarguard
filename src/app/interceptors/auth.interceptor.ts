import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = localStorage.getItem('auth_token');

  if (token) {
    const requestWithCredentials = req.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return next(requestWithCredentials).pipe(
      catchError((e) => {
        if(e.status === 401 && !req.url.includes('/login')) {
          authService.handleUnauthorizedAccess();
        }
  
        return throwError(() => e)
      })
    )
  }

  return next(req.clone({withCredentials: true}));
};
