import { Component, Input, OnInit } from '@angular/core';
import { ExpenseFormComponent } from '../../expense-form/expense-form.component';
import { MonthlyStatsComponent } from '../../monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from '../../percentage-overview/percentage-overview.component';
import { TransactionsComponent } from '../../transactions/transactions.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, TransactionsComponent, HttpClientModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {

  @Input() year =  ''
  @Input() month = ''

  nameOfMonth = ''

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/transactions/${this.year}/${this.month}`).subscribe((data) => {
      console.log(data)
    });

    this.nameOfMonth = this.getMonthName(new Date(Number(this.year), Number(this.month) - 1))
  }

  getMonthName(date: Date) {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  }

  constructor(private http: HttpClient) {}
}
