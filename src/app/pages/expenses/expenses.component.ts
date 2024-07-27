import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExpenseFormComponent } from '@components/expense-form/expense-form.component';
import { MonthlyStatsComponent } from '@components/monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from '@components/percentage-overview/percentage-overview.component';
import { ExpensesTableComponent } from '@components/expenses-table/expenses-table.component';
import { MonthSelectorComponent } from '@components/month-selector/month-selector.component';
import { ExpensesService } from '../../services/expenses.service';
import { Subscription } from 'rxjs';
import { Expense } from '@interfaces/expense';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, ExpensesTableComponent, MonthSelectorComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() year = ''
  @Input() month = ''

  isDataLoading = true
  expenses: Expense[] = []

  ngOnInit(): void {
    this.expensesService.getExpenses(this.year, this.month).subscribe({
      next: (expenses) => {
        this.isDataLoading = false
        this.expenses = expenses
      },

      error: (e) => {
        console.log('Unable to fetch expenses', e);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private expensesService: ExpensesService) { }
}
