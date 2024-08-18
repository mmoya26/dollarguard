import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  return authService.valiteUserSession().pipe(
    tap((isUserAuthenticated) => {
      
      if (!isUserAuthenticated) {
        authService.handleUnauthorizedAccess();
        return false
      }

      return true
    }),
    catchError((e) => {
      console.error('Error in guard when try to validate user session');
      authService.handleUnauthorizedAccess();
      return of(false);
    })
  );
};