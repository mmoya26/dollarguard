import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-years-selection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './years-selection.component.html',
  styleUrl: './years-selection.component.css'
})
export class YearsSelectionComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();
  years: String[] = [];

  ngOnInit(): void {
    this.subscription = this.expensesService.getUsersYearsForExpenses().subscribe(years => {
      this.years = years;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private expensesService: ExpensesService) {}
}
