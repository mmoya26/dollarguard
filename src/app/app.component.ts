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

  categories: Category[] = [
    {
      name: "Miscellaneous",
      hexColor: "#475569",
      twClass: "slate-600"
    },
    {
      name: "Gas",
      hexColor: "#DC2626",
      twClass: "red-600"
    },
    {
      name: "Utilities",
      hexColor: "#0891B2",
      twClass: "cyan-600"
    },
    {
      name: "Groceries",
      hexColor: "#D97706",
      twClass: "amber-600"
    },
    {
      name: "Phone Bill",
      hexColor: "#4F46E5",
      twClass: "indigo-600"
    }
  ]

  listOfTransactions: Transaction[] = [
    {
      id: "1",
      amount: "123.98",
      date: "5/27/2024",
      category: 'Gas',
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
    // Temporary solution for the ids

    // Create a new transaction object based on the properties of the passed transaction object
    // instead of using the reference directly passed
    let newTransaction: Transaction = {...transaction};
    newTransaction.id = String(this.listOfTransactions.length + 1);

    console.log("Transaction: ", newTransaction);
    this.listOfTransactions.push(newTransaction);
  }
}
