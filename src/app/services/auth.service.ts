import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL_ENDPOINT = `http://localhost:3000/auth`

  private isAuthLoading = new BehaviorSubject<boolean>(false);
  public isAuthLoading$ = this.isAuthLoading.asObservable();

  private isUserLoggedIn = false

  login(email: string, password: string) {
    return this.http.post(`${this.AUTH_URL_ENDPOINT}/login`, { email, password }).pipe(
      tap(() => {
        this.isUserLoggedIn = true;
      })
    );
  }

  get isUserAuthenticated() {
    return this.isUserLoggedIn;
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post(`${this.AUTH_URL_ENDPOINT}/signup`, { name, email, password });
  }

  setIsAuthLoading(flag: boolean) {
    this.isAuthLoading.next(flag);
  }

  handleUnathenticatedUsers() {
    this.isUserLoggedIn = false;
    this.isAuthLoading.next(false)
    this.router.navigate(['/login']);
  }

  validateSession() {
    console.log('Validate session running...')
    this.isAuthLoading.next(true);

    if (this.isUserLoggedIn) {
      this.isAuthLoading.next(false);
      return Promise.resolve(true);
    }

    return firstValueFrom(
      this.http.get<{ isAuthenticated: boolean }>(`${this.AUTH_URL_ENDPOINT}/validate`).pipe(
        map(response => response.isAuthenticated),
        tap(isValid => {
          this.isUserLoggedIn = isValid;
          this.isAuthLoading.next(false);
        })
      )
    )
  }

  constructor(private http: HttpClient, private router: Router) { }
}
