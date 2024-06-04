import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private _listOfTransactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([
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
    //   category: 'Phone Bill',
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
  ]);
  public listOfTransactions$ = this._listOfTransactions.asObservable();

  // Wondering if I should make this an obversable as well
  public transactionsTotalAmount = this.calculateTransactionTotalAmount();

  getCurrentTransactions(): Transaction[] {
    return this._listOfTransactions.getValue();
  }

  addTransaction(transaction: Transaction) {
    // Temporary solution for the ids

    // Create a new transaction object based on the properties of the passed transaction object
    // instead of using the reference directly passed
    let newTransaction: Transaction = {...transaction};
    newTransaction.id = String(this._listOfTransactions.value.length + 1);

    // Ammount needs to be set first before triggering listOfTrasactions observable
    this.transactionsTotalAmount += Number(transaction.amount);
    this._listOfTransactions.next([...this._listOfTransactions.value, newTransaction]);
  }

  getTransactionsTotalAmountByCategory(category: string): number {
    let amount = 0;

    this._listOfTransactions.value.forEach(transaction => {
      if (transaction.category === category) {
        amount += Number(transaction.amount);
      }
    });

    return amount;
  }

  calculateTransactionTotalAmount() {
    return this._listOfTransactions.value.reduce((acc, current) => acc + Number(current.amount), 0);
  }

  constructor() { }
}
