import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ExpenseFormComponent } from '@components/expense-form/expense-form.component';
import { MonthlyStatsComponent } from '@components/monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from '@components/percentage-overview/percentage-overview.component';
import { ExpensesTableComponent } from '@components/expenses-table/expenses-table.component';
import { MonthSelectorComponent } from '@components/month-selector/month-selector.component';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '@interfaces/expense';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, ExpensesTableComponent, MonthSelectorComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit, OnChanges {
  @Input() year = ''
  @Input() month = ''

  expenses: Expense[] = []
  isDataLoading = true

  ngOnInit(): void {
    console.log(`Calling API with year: ${this.year} & month: ${this.month}`);
    
    this.expensesService.getExpenses(this.year, this.month).subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
      this.isDataLoading = false
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('From main page', changes)
  }

  constructor(private expensesService: ExpensesService) { }
}
