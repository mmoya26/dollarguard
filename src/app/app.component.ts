import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from './percentage-overview/percentage-overview.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { Transaction } from './interfaces/transaction';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ExpenseFormComponent, MonthlyStatsComponent, PercentageOverviewComponent, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dollarguard';

  listOfTransactions: Transaction[] = [
    {
      id: "1",
      amount: "123.98",
      date: "5/27/2024",
      category: 'Groceries',
      note: "Test Notes"
    },
    {
      id: "2",
      amount: "80.99",
      date: "5/27/2024",
      category: 'Phone Bill',
      note: "Test Notes"
    },
  ];

  handleSubmit(transaction: Transaction) {
    let newTransaction = transaction;
    newTransaction.id = String(this.listOfTransactions.length + 1);
    this.listOfTransactions.push(newTransaction);
  }
}
