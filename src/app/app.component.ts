import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'routing-app';

  constructor() {}
}
