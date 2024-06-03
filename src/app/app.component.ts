import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';
import { PercentageOverviewComponent } from './percentage-overview/percentage-overview.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { Transaction } from './interfaces/transaction';
import { Category } from './interfaces/category';

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
      amount: "100",
      date: "5/27/2024",
      category: 'Gas',
      note: "Test Notes"
    },
    {
      id: "2",
      amount: "50",
      date: "5/27/2024",
      category: 'Phone Bill',
      note: "Test Notes"
    },
    // {
    //   id: "3",
    //   amount: "50",
    //   date: "6/2/2024",
    //   category: 'Utilities',
    //   note: "Test Notes"
    // },
    // {
    //   id: "4",
    //   amount: "100",
    //   date: "6/2/2024",
    //   category: 'Utilities',
    //   note: "Test Notes"
    // },
    // {
    //   id: "4",
    //   amount: "120",
    //   date: "6/2/2024",
    //   category: 'Groceries',
    //   note: "Test Notes"
    // },
    // {
    //   id: "5",
    //   amount: "120",
    //   date: "6/2/2024",
    //   category: 'Groceries',
    //   note: "Test Notes"
    // },
    // {
    //   id: "6",
    //   amount: "50",
    //   date: "5/27/2024",
    //   category: 'Gas',
    //   note: "Test Notes"
    // },
  ];

  handleSubmit(transaction: Transaction) {
    // Temporary solution for the ids

    // Create a new transaction object based on the properties of the passed transaction object
    // instead of using the reference directly passed
    let newTransaction: Transaction = {...transaction};
    newTransaction.id = String(this.listOfTransactions.length + 1);

    console.log("Transaction: ", newTransaction);
    this.listOfTransactions.push(newTransaction);
  }
}
