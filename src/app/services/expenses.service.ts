import { Injectable } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpenseDto } from '@interfaces/expense'

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private API_URL = `http://localhost:3000/expenses`;

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
    return this.http.post<Expense>(`${this.API_URL}/${year}/${month}`, expense).subscribe(expense => {
      this._listOfExpenses.next([...this._listOfExpenses.value, expense]);
    })
  }

  deleteExpense(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`).subscribe((_) => {
      const filteredList = this._listOfExpenses.value.filter(e => e.id !== id);
      this._listOfExpenses.next(filteredList);
    })
  }

  editExpense(expense: Expense) {
    const datePart = new Date(expense.date).toISOString().split('T')[0];
    const [year, month, day] = datePart.split('-');
    const formattedDate = `${month}/${day}/${year}`;

    this._currentExpenseBeingEdited.next({ id: expense.id, amount: expense.amount, category: expense.category.name, date: formattedDate, notes: expense.notes || "" })
  }

  updateExpense(id: string, expense: ExpenseDto) {
    return this.http.patch<Expense>(`${this.API_URL}/${id}`, expense).subscribe(_ => {
      // Update local expenses list
      let expenseBeingEdited: Expense = this._listOfExpenses.value.find(e => e.id === id)!;
      expenseBeingEdited.amount = expense.amount
      expenseBeingEdited.category = expense.category
      expenseBeingEdited.userId = expense.userId
      expenseBeingEdited.notes = expense.notes ?? ""

      const newDate = new Date(expenseBeingEdited.date);
      newDate.setDate(Number(expense.monthDay));

      expenseBeingEdited.date = newDate;

      const filteredListOfExpenses = this._listOfExpenses.value.filter(e => e.id !== id);

      this._listOfExpenses.next([...filteredListOfExpenses, expenseBeingEdited]);
    });
  }

  clearCurrentExpenseBeingEdited() {
    this._currentExpenseBeingEdited.next({ id: '', amount: 0, category: '', date: '', notes: '' });
  }

  getUsersYearsForExpenses() {
    return this.http.get<String[]>(`${this.API_URL}`);
  }

  get expensesTotalAmount() {
    return this._listOfExpenses.value.reduce((acc, current) => acc + current.amount, 0);
  }

  get expenseBeingEditedId() {
    return this._currentExpenseBeingEdited.value.id;
  }

  constructor(private http: HttpClient) { }
}
