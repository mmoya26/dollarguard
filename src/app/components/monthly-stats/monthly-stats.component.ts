import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../../services/transactions.service';

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
    this.sub = this.transactionsService.listOfTransactions$.subscribe(transactions => {
      this.monthExpenses = this.transactionsService.transactionsTotalAmount;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(private transactionsService: TransactionsService) {}
}
