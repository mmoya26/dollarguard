import { Injectable } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseDto } from '../interfaces/expense-dto';

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

  addExpense(expense: ExpenseDto, year: string, month: string) {
    return this.http.post<Expense>(`${this.API_URL}/${year}/${month}`, expense).subscribe(expense => {
      this._listOfExpenses.next([...this._listOfExpenses.value, expense]);
    })
  }

  deleteExpense(id: string, year: string, month: string) {
    return this.http.delete(`${this.API_URL}/${year}/${month}/${id}`).subscribe((_) => {
      const filteredList = this._listOfExpenses.value.filter(e => e.id !== id);
      this._listOfExpenses.next(filteredList);
    })
  }

  get expensesTotalAmount() {
    return this._listOfExpenses.value.reduce((acc, current) => acc + Number(current.amount), 0);
  }

  constructor(private http: HttpClient) { }
}
