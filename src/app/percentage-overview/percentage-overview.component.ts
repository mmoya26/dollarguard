import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';

interface ActiveCategory {
  name: string,
  amount: number,
  percentage: string;
}

@Component({
  selector: 'percentage-overview',
  standalone: true,
  imports: [],
  templateUrl: './percentage-overview.component.html',
  styleUrl: './percentage-overview.component.css'
})
export class PercentageOverviewComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  activeCategories: string[] = [];
  transactionsTotal = 0;

  ngOnInit(): void {
    this.sub = this.transactionsService.listOfTransactions$.subscribe(newTransactions => {
      this.updateActiveCategories(newTransactions);
      this.transactionsTotal = this.transactionsService.transactionsTotalAmount ;
    });    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateActiveCategories(transactions: Transaction[]) {
    transactions.forEach(t => {
      if (!this.activeCategories.some(category => category === t.category)) {
        this.activeCategories.push(t.category);
      }
    });
  }

  categoryBarWidth(category: string) {
    return Math.round((this.transactionsService.getTransactionsTotalAmountByCategory(category) / this.transactionsTotal) * 100);
  }

  getCategoryColor(category: string) {
    return this.categoryService.getCategoryColor(category);
  }
  
  constructor(private categoryService: CategoryService, private transactionsService: TransactionsService) {}
}
