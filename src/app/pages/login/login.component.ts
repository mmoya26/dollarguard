import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  pid = inject(PLATFORM_ID);

  get isLoggedIn() {
    return this.authService.identityClaims;
  }

  logIn() {
    this.authService.login();
  }

  logOut() {
    this.authService.logout();
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.pid)) {
      console.log(this.pid);
      this.oauthService.tryLogin();
    }
  }


  constructor(private authService: AuthService, private oauthService: OAuthService) {}
}
