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
import { UserPreferencesService } from '../../services/user-preferences.service';
import { ManageCategoriesModalComponent } from '@components/manage-categories-modal/manage-categories-modal.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterLink, ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, ExpensesTableComponent, MonthSelectorComponent, ManageCategoriesModalComponent],
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private userExpensesSubscription: Subscription = new Subscription();
  private userCategoriesSubscription: Subscription = new Subscription();

  @Input() year = ''
  @Input() month = ''

  isDataLoading = true
  expenses: Expense[] = []

  ngOnInit(): void {
    this.userExpensesSubscription = this.expensesService.getExpenses(this.year, this.month).subscribe({
      next: (_) => {
        this.isDataLoading = false
      },

      error: (e) => {
        this.isDataLoading = false
        console.error('Unable to fetch expenses', e);
      }
    });

    this.userCategoriesSubscription = this.userPreferenceService.getUserCategories().subscribe();

    this.subscriptions.add(this.userExpensesSubscription);
    this.subscriptions.add(this.userCategoriesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  constructor(private expensesService: ExpensesService, private authService: AuthService, private userPreferenceService: UserPreferencesService) { }
}
