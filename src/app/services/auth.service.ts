import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL_ENDPOINT = `http://localhost:3000/auth`

  private isUserAuthenticated: boolean | null = null;

  login(email: string, password: string) {
    return this.http.post(`${this.AUTH_URL_ENDPOINT}/login`, { email, password }).pipe(
      tap(_ => {
        this.isUserAuthenticated = true
      })
    )
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post(`${this.AUTH_URL_ENDPOINT}/signup`, { name, email, password }).pipe(
      tap(_ => {
        this.isUserAuthenticated = true
      })
    );
  }

  logout() {
    console.log('Login user out...');

    this.http.post(`${this.AUTH_URL_ENDPOINT}/logout`, {}).subscribe({
      next: () => {
        this.isUserAuthenticated = false;
        this.router.navigate(['/login']);
      },
      error: (e) => {
        console.error('Error when logging user out', e)
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
