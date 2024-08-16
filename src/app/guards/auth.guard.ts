import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const router = inject(Router)
  const authService = inject(AuthService);

  console.log('In Guard');

  if(authService.isUserAuthenticated) {
    return of(true);
  }

  return authService.validateSession().pipe(
    map(isValid => {

      if (!isValid) {
        authService.handleUnauthorizedAccess();
      }

      return isValid
    }),
    catchError(() => {
      authService.handleUnauthorizedAccess();
      return of(false);
    })
  )
};