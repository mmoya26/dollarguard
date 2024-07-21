import { Injectable } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private API_URL = `http://localhost:3000/expenses`;

  getExpenses(year: string, month: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.API_URL}/${year}/${month}`);
  }

  calculateTotalAmount(expenses: Expense[]): number {
    return expenses.reduce((acc, current) => acc + Number(current.amount), 0);
  }

  constructor(private http: HttpClient) { }
}
