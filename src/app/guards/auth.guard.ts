import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = async (route, state): Promise<boolean> => {
  console.log('In Guard');

  const authService = inject(AuthService);

  const isUserAuthenticated = await authService.validateSession();

  return isUserAuthenticated;
};