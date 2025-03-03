import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExpenseFormComponent } from '@components/expense-form/expense-form.component';
import { MonthlyStatsComponent } from '@components/monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from '@components/percentage-overview/percentage-overview.component';
import { ExpensesTableComponent } from '@components/expenses-table/expenses-table.component';
import { MonthSelectorComponent } from '@components/month-selector/month-selector.component';
import { ExpensesService } from '../../services/expenses.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { ManageCategoriesModalComponent } from '@components/manage-categories-modal/manage-categories-modal.component';

@Component({
    selector: 'app-expenses',
    standalone: true,
    imports: [RouterLink, ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, ExpensesTableComponent, MonthSelectorComponent, ManageCategoriesModalComponent],
    templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private userCategoriesSubscription: Subscription = new Subscription();

  @ViewChild('expenseFormComponent') expenseFormComponent!: ExpenseFormComponent;
 
  @Input() year = ''
  @Input() month = ''

  isCategoryModalOpen = false;

  ngOnInit(): void {
    this.userCategoriesSubscription = this.userPreferenceService.getUserCategories().subscribe();
    this.subscriptions.push(this.userCategoriesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleCategoryModal() {
    this.isCategoryModalOpen = !this.isCategoryModalOpen;
  }

  triggerFocusExpensesForm() {
    this.expenseFormComponent.focusForm();
  }

  logout() {
    this.authService.logout();
  }

  constructor(private expensesService: ExpensesService, private authService: AuthService, private userPreferenceService: UserPreferencesService) { }
}
