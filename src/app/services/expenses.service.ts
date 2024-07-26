import { Injectable } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private API_URL = `http://localhost:3000/expenses`;

  private _listOfExpenses: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([]);
  public listOfExpenses$ = this._listOfExpenses.asObservable();

  getExpenses(year: string, month: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.API_URL}/${year}/${month}`).pipe(
      tap(expenses => {
        this._listOfExpenses.next(expenses);
      })
    );
  }

  calculateTotalAmount(expenses: Expense[]): number {
    return expenses.reduce((acc, current) => acc + Number(current.amount), 0);
  }

  constructor(private http: HttpClient) { }
}
