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
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    console.log(this.years$)
    this.years$ = this.expensesService.getUsersYearsForExpenses();
    console.log(this.years$)
  }

  constructor(private expensesService: ExpensesService) {}
}
