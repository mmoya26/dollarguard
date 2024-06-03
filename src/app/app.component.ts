import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from './percentage-overview/percentage-overview.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { Transaction } from './interfaces/transaction';
import { Category } from './interfaces/category';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dollarguard';

  constructor() {}
}
