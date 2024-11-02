import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '@interfaces/category';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  private USER_PREFERENCES_BASE_END_POINT = `${environment.apiUrl}/user-preferences/categories`


  private _currentUserCategories = new BehaviorSubject<Category[]>([]);
  public currentuserCategories$ = this._currentUserCategories.asObservable();


  getUserCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.USER_PREFERENCES_BASE_END_POINT}`).pipe(
      tap(categories => {
        this._currentUserCategories.next([...categories]);
      })
    );
  }

  constructor(private http: HttpClient) { }
}
