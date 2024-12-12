import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('expenseFormComponent') expenseFormComponent!: ExpenseFormComponent;

  // This will listen for all clicks within the component
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.isUserEditingBudget) {
      const clickedElement = event.target as HTMLElement;
      const validIds = ['editBudgetBox','editBudgetBoxForm', 'editBudgetBoxHeading', 'editBudgetBoxLabel', 'integeronly', 'editBudgetDollarSign'];
      const invalidIds = ['staleBudgetBox', 'staleBudgetHeader', 'staleBudgetLabel'];

      /* 
        If the user is "editing their budget" but the ID of the element clicked is the one of the invalid IDs it means that 
        we should skip the next if statement because we want to be able to display the edit box, because the isUserEditingBudget variable
        gets set first and then the click event is trigger but at that point isUSerEditingBudget is already true (but not really)
      */
      if (invalidIds.includes(clickedElement.id)) {
        return;
      }

      /* 
        If the ID of the clicked element is not any of the valid IDs then it means that we should stop focusing the
        edit budget box and stop whaever editing they were doing
      */
      if (!validIds.includes(clickedElement.id)) {
        this.isUserEditingBudget = false;
      }
    }
  }
 
  @Input() year = ''
  @Input() month = ''

  isCategoryModalOpen = false;
  isDataLoading = true;
  isUserEditingBudget = false;
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
