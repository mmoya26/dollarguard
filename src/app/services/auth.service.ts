import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL_ENDPOINT = `${environment.apiUrl}/auth`

  private isUserAuthenticated: boolean | null = null;

  login(username: string, password: string) {
    return this.http.post<{message: string, auth_token: string}>(`${this.AUTH_URL_ENDPOINT}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.auth_token);
        this.isUserAuthenticated = true
      })
    )
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post<{message: string, access_token: string}>(`${this.AUTH_URL_ENDPOINT}/signup`, { name, email, password }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.access_token);
        this.isUserAuthenticated = true
      })
    );
  }

  logout() {
    this.http.post(`${this.AUTH_URL_ENDPOINT}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('auth_token');
        this.isUserAuthenticated = false;
        this.router.navigate(['/login']);
      },
      error: (e) => {
        localStorage.removeItem('auth_token');
        console.error('Error when logging user out', e);
        this.isUserAuthenticated = false;
        this.router.navigate(['/login']);
      }
    })
  }

  valiteUserSession() {
    if (this.isUserAuthenticated) {
      return of(true);
    }

    return this.http.get<{isAuthenticated: boolean}>(`${this.AUTH_URL_ENDPOINT}/validate`).pipe(
      map((response) => response.isAuthenticated),
      tap((validation) => {
        this.isUserAuthenticated = validation;
      }),
      catchError((e) => {
        console.error('Error when trying to validate user');
        return of(false);
      })
    )
  }

  handleUnauthorizedAccess() {
    this.isUserAuthenticated = false;

    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  constructor(private http: HttpClient, private router: Router) { }
}
