import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this,this.oauthService.logOut();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  get acessToken() {
    return this.oauthService.getAccessToken();
  }

  get userProfile() {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo";

    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.acessToken}`
      }
    });
  }

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.configure();
  }
}
