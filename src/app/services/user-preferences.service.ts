import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '@interfaces/category';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NewCategoryDto } from '@interfaces/user-preferences';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  private USER_PREFERENCES_BASE_END_POINT = `${environment.apiUrl}/user-preferences`


  private _currentUserCategories = new BehaviorSubject<Category[]>([]);
  public currentuserCategories$ = this._currentUserCategories.asObservable();


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
        console.log(categories);
      })
    )
  }

  constructor(private http: HttpClient) { }
}
