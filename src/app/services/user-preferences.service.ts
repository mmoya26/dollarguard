import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '@interfaces/category';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NewCategoryDto, UpdateBudgetDto } from '@interfaces/user-preferences';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  private USER_PREFERENCES_BASE_END_POINT = `${environment.apiUrl}/user-preferences`

  private _currentUserCategories = new BehaviorSubject<Category[]>([]);
  public currentuserCategories$ = this._currentUserCategories.asObservable();

  private _currentUserBudget = new BehaviorSubject<number>(0);
  public currentUserBudget$ = this._currentUserBudget.asObservable();


  getUserCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.USER_PREFERENCES_BASE_END_POINT}/categories`).pipe(
      tap(categories => {
        this._currentUserCategories.next([...categories]);
      })
    );
  }

  addNewUserCategory(category: NewCategoryDto): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.USER_PREFERENCES_BASE_END_POINT}/categories`, category).pipe(
      tap(categories => {
        this._currentUserCategories.next([...categories]);
      })
    )
  }

  deleteUserCategory(name: string): Observable<Category[]> {
    return this.http.delete<Category[]>(`${this.USER_PREFERENCES_BASE_END_POINT}/categories/${name}`).pipe(
      tap(categories => {
        this._currentUserCategories.next([...categories]);
      })
    );
  }

  updateUserBudget(updateBudgetDto: UpdateBudgetDto) { 
    return this.http.patch(`${this.USER_PREFERENCES_BASE_END_POINT}/budgets`, updateBudgetDto).pipe(
      tap(_ => {
        this._currentUserBudget.next(updateBudgetDto.newAmount);    
      })
    );
  }

  getUserBudget(year: string, month: string) {
    return this.http.get<number | null>(`${this.USER_PREFERENCES_BASE_END_POINT}/budgets/${year}/${month}`).pipe(
      tap(amount => {
        this._currentUserBudget.next(amount ?? 0);
      })
    );
  }

  getUserActiveYears(): Observable<string[]> {
    return this.http.get<string[]>(`${this.USER_PREFERENCES_BASE_END_POINT}/active-years`);
  }

  constructor(private http: HttpClient) { }
}
