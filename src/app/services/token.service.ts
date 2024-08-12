import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth_token';

  setToken(token: string, expirationDays: number = 7) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    

    // TODO: HttpOnly add to cookie value
    const cookieValue = encodeURIComponent(token) + '; expires=' + expirationDate.toUTCString() + '; path=/; Secure; SameSite=Strict';
    document.cookie = `${this.tokenKey}=${cookieValue}`; 
  }

  constructor() { }
}
