import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExpenseFormComponent } from '@components/expense-form/expense-form.component';
import { MonthlyStatsComponent } from '@components/monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from '@components/percentage-overview/percentage-overview.component';
import { ExpensesTableComponent } from '@components/expenses-table/expenses-table.component';
import { MonthSelectorComponent } from '@components/month-selector/month-selector.component';
import { ExpensesService } from '../../services/expenses.service';
import { Subscription } from 'rxjs';
import { Expense } from '@interfaces/expense';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterLink, ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, ExpensesTableComponent, MonthSelectorComponent],
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() year = ''
  @Input() month = ''

  isDataLoading = true
  expenses: Expense[] = []

  ngOnInit(): void {
    this.subscription = this.expensesService.getExpenses(this.year, this.month).subscribe({
      next: (_) => {
        this.isDataLoading = false
      },

      error: (e) => {
        this.isDataLoading = false
        console.error('Unable to fetch expenses', e);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }

  constructor(private expensesService: ExpensesService, private authService: AuthService) { }
}
