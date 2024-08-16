import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL_ENDPOINT = `http://localhost:3000/auth`
  public isAuthenticatedStatus: boolean | null = null;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
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

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  clearAuthStatus() {
    this.isAuthenticatedStatus = false;
    this.isLoadingSubject.next(false);
  }

  handleUnauthorizedAccess() {
    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  // isAuthenticated(): Observable<boolean> {
  //   console.log(this.isAuthenticatedStatus);

  //   this.isLoadingSubject.next(true);

  //   if (this.isAuthenticatedStatus !== null) {
  //     this.isLoadingSubject.next(false);
  //     return of(this.isAuthenticatedStatus!);
  //   }

  //   return this.http.get<{ isAuthenticated: boolean }>(`${this.AUTH_URL_ENDPOINT}/validate`).pipe(
  //     map(response => response.isAuthenticated),
  //     tap(isAuthenticated => {
  //       this.isLoadingSubject.next(false);
  //       this.isAuthenticatedStatus = isAuthenticated
  //     }),
  //     catchError(() => {
  //       // Handle non 401 errors 
  //       this.clearAuthStatus();
  //       return of(false);
  //     })
  //   );

  // }

  validateSession() {
    if (this.isUserLoggedIn) {
      return of(true)
    }

    return this.http.get<{ isAuthenticated: boolean }>(`${this.AUTH_URL_ENDPOINT}/validate`).pipe(
      map(response => response.isAuthenticated),
      tap(isValid => {
        this.isUserLoggedIn = isValid;
      })
    )
  }

  constructor(private http: HttpClient, private router: Router) { }
}
