import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);

  console.log('In Guard');

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {      
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false
      }
      
      return true
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false)
    })
  )
};