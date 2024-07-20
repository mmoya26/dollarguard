import { Injectable } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private API_URL = `http://localhost:3000/expenses`;

  // private _listOfTransactions: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([
  //   {
  //     userId: "ui1",
  //     transactionId: "1",
  //     amount: "100",
  //     date: "5/27/2024",
  //     category: {
  //       name: 'Gas',
  //       hexColor: '#DC2626'
  //     },
  //     note: "Test Notes"
  //   },
  //   {
  //     userId: "ui1",
  //     transactionId: "2",
  //     amount: "50",
  //     date: "5/27/2024",
  //     category: {
  //       name: 'Phone Bill',
  //       hexColor: '#4F46E5'
  //     },
  //     note: "Test Notes"
  //   },
  // ]);
  // public listOfTransactions$ = this._listOfTransactions.asObservable();

  // // Wondering if I should make this an obversable as well
  // public transactionsTotalAmount = this.calculateTransactionTotalAmount();

  // getCurrentTransactions(): Transaction[] {
  //   return this._listOfTransactions.getValue();
  // }

  // addTransaction(transaction: Transaction) {
  //   // Ammount needs to be set first before triggering listOfTrasactions observable
  //   this.transactionsTotalAmount += Number(transaction.amount);
  //   this._listOfTransactions.next([...this._listOfTransactions.value, transaction]);
  // }

  // getTransactionsTotalAmountByCategory(category: string): number {
  //   let amount = 0;

  //   this._listOfTransactions.value.forEach(transaction => {
  //     if (transaction.category.name === category) {
  //       amount += Number(transaction.amount);
  //     }
  //   });

  //   return amount;
  // }

  // calculateTransactionTotalAmount() {
  //   return this._listOfTransactions.value.reduce((acc, current) => acc + Number(current.amount), 0);
  // }

  getExpensesByYearAndMonth(year: string, month: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.API_URL}/${year}/${month}`);
  }

  constructor(private http: HttpClient) { }
}
