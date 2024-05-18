import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ExpenseFormComponent, MonthlyStatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dollarguard';
}
