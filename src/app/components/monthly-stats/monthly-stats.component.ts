import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'monthly-stats',
  standalone: true,
  imports: [],
  templateUrl: './monthly-stats.component.html',
  styleUrl: './monthly-stats.component.css'
})
export class MonthlyStatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  monthlyBudget = 4000.00;
  monthExpenses = 0;

  get runningTotal() {
    return this.monthlyBudget - this.monthExpenses;
  }

  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.subscribe((_) => {
      this.monthExpenses = this.expensesService.expensesTotalAmount;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private expensesService: ExpensesService) {}
}
