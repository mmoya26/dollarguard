import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL_ENDPOINT = `http://localhost:3000/auth`

  login(email: string, password: string) {
    return this.http.post(`${this.AUTH_URL_ENDPOINT}/login`, {email, password}, {withCredentials: true});
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post(`${this.AUTH_URL_ENDPOINT}/signup`, {name, email, password}, {withCredentials: true});
  }

  constructor(private http: HttpClient) { }
}
