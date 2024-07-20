import { Component, Input, OnInit, output, Output } from '@angular/core';
import { ExpenseFormComponent } from '@components/expense-form/expense-form.component';
import { MonthlyStatsComponent } from '@components/monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from '@components/percentage-overview/percentage-overview.component';
import { TransactionsComponent } from '@components/transactions/transactions.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MonthSelectorComponent } from '@components/month-selector/month-selector.component';
import { getMonthName } from '@helpers/getMonthName';
import { EventEmitter } from 'stream';
import { Transaction } from '@interfaces/transaction';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, TransactionsComponent, HttpClientModule, MonthSelectorComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  @Input() year = ''
  @Input() month = ''

  ngOnInit(): void {
    this.http.get<Transaction[]>(`http://localhost:3000/expenses/${this.year}/${this.month}`).subscribe((data) => {
      console.log(data)
    });
  }

  constructor(private http: HttpClient) { }
}
