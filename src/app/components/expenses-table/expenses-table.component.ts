import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ExpensesService } from '../../services/expenses.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'transactions',
  standalone: true,
  imports: [DatePipe, HttpClientModule],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  categoryService = inject(CategoryService);

  transactions: Expense[] = []

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  editTransaction() {
    this.http.get('http://localhost:3000/').subscribe((data) => {
      this.transactions = <Expense[]>data;
    });
  }

  constructor(private expensesService: ExpensesService, private http: HttpClient) {}
}
