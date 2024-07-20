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
  private sub: Subscription = new Subscription();

  monthlyBudget = 3100.00;
  monthExpenses = 0;


  get runningTotal() {
    return this.monthlyBudget - this.monthExpenses;
  }


  ngOnInit(): void {
    // this.sub = this.expensesService.listOfTransactions$.subscribe(transactions => {
    //   this.monthExpenses = this.expensesService.transactionsTotalAmount;
    // });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(private expensesService: ExpensesService) {}
}
