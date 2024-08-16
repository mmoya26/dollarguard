import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  subscription = new Subscription();  
  title = 'routing-app';

  isAuthLoading = true;

  ngOnInit(): void {
    this.subscription = this.authService.isAuthLoading$.subscribe(loading => {
      console.log(`Auth loading in app component`, loading)
      this.isAuthLoading = loading;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private authService: AuthService) {}
}
