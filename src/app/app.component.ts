import { CommonModule } from '@angular/common';
import { Component }  from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html'
})
export class AppComponent {
  subscription = new Subscription();  
  title = 'routing-app';

  constructor() {}
}
