import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL_ENDPOINT = `http://localhost:3000/auth`

  login(email: string, password: string) {
    return this.http.post<{access_token: string}>(`${this.AUTH_URL_ENDPOINT}/login`, {email, password}).pipe(
      tap(response => {
        // Expirations days missing?
        this.tokenService.setToken(response.access_token);
      })
    )
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }
}
