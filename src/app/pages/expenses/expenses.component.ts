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
  private subscription2: Subscription = new Subscription();

  @Input() year = ''
  @Input() month = ''

  isDataLoading = true
  expenses: Expense[] = []

  ngOnInit(): void {
    this.subscription = this.expensesService.getExpenses(this.year, this.month).subscribe(_ => {
      this.isDataLoading = false
    });

    this.subscription2 = this.expensesService.listOfExpenses$.subscribe(expenses => {
      this.expenses = expenses;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  constructor(private expensesService: ExpensesService) { }
}
