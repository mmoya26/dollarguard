import { Injectable } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseDto } from '@interfaces/expense'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private API_URL = `${environment.apiUrl}/expenses`;

  private _listOfExpenses: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([]);
  public listOfExpenses$ = this._listOfExpenses.asObservable();

  private _currentExpenseBeingEdited = new BehaviorSubject({ id: '', amount: 0, category: '', date: '', notes: '' });
  public currentExpenseBeingEdited$ = this._currentExpenseBeingEdited.asObservable();

  getExpenses(year: string, month: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.API_URL}/${year}/${month}`).pipe(
      tap(expenses => {
        this._listOfExpenses.next(expenses);
      })
    );
  }

  addExpense(expense: ExpenseDto, year: string, month: string) {
    return this.http.post<Expense>(`${this.API_URL}/${year}/${month}`, expense).pipe(
      tap((returnedExpense: Expense) => {
        this._listOfExpenses.next([...this._listOfExpenses.value, returnedExpense]);
      })
    );
  }

  deleteExpense(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      tap(_ => {
        const filteredList = this._listOfExpenses.value.filter(e => e.id !== id);
        this._listOfExpenses.next(filteredList);
      })
    )
  }

  editExpense(expense: Expense) {
    const datePart = new Date(expense.date).toISOString().split('T')[0];
    const [year, month, day] = datePart.split('-');
    const formattedDate = `${month}/${day}/${year}`;

    this._currentExpenseBeingEdited.next({ id: expense.id, amount: expense.amount, category: expense.category.name, date: formattedDate, notes: expense.notes || "" })
  }

  updateExpense(id: string, expense: ExpenseDto) {
    return this.http.patch<Expense>(`${this.API_URL}/${id}`, expense).pipe(
      tap((updatedExpense: Expense) => {
        const filteredListOfExpenses = this._listOfExpenses.value.filter(e => e.id !== id);
        this._listOfExpenses.next([...filteredListOfExpenses, updatedExpense]);
      })
    );
  }

  clearCurrentExpenseBeingEdited() {
    this._currentExpenseBeingEdited.next({ id: '', amount: 0, category: '', date: '', notes: '' });
  }

  get expensesTotalAmount() {
    const expensesTotalAmount = this._listOfExpenses.value.reduce((acc, current) => acc + current.amount, 0);
    return Number(expensesTotalAmount.toFixed(2));
  }

  get expenseBeingEditedId() {
    return this._currentExpenseBeingEdited.value.id;
  }

  constructor(private http: HttpClient) { }
}
