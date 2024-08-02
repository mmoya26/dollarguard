import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit {
  years$: Observable<String[]> = new Observable<String[]>;
  currentMonth = new Date().getMonth() + 1;

  ngOnInit(): void {
    this.years$ = this.expensesService.getUsersYearsForExpenses();
  }

  constructor(private expensesService: ExpensesService) {}
}
