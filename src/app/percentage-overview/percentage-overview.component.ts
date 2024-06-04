import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { TransactionsService } from '../services/transactions.service';
import { Category } from '../interfaces/category';

interface ActiveCategory extends Category {
  percentage: string
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

  activeCategories: ActiveCategory[] = [];
  transactionsTotal = 0;

  ngOnInit(): void {
    this.sub = this.transactionsService.listOfTransactions$.subscribe(newTransactions => {
      this.updateActiveCategories(newTransactions);
      this.transactionsTotal = this.transactionsService.transactionsTotalAmount; // MAKE THIS A OBSERVABLE LATER ON
      this.calculateActiveCategoriesPercentages();
    });    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateActiveCategories(transactions: Transaction[]) {
    transactions.forEach(t => {
      if (!this.activeCategories.some(activeCategory => activeCategory.name === t.category.name)) {
        this.activeCategories.push({name: t.category.name, hexColor: t.category.hexColor, percentage: '0'});
      }
    });
  }

  categoryBarWidth(category: string) {
    return Math.round((this.transactionsService.getTransactionsTotalAmountByCategory(category) / this.transactionsTotal) * 100);
  }

  calculateActiveCategoriesPercentages() {
    let newCalculatedCategories: ActiveCategory[] = this.activeCategories.map(c => {
      let newActiveCategory: ActiveCategory = {...c, percentage: String(Math.round((this.transactionsService.getTransactionsTotalAmountByCategory(c.name) / this.transactionsTotal) * 100))}
      return newActiveCategory
    });

    this.activeCategories = [...newCalculatedCategories]

    console.log(newCalculatedCategories);
  }
  
  constructor(private categoryService: CategoryService, private transactionsService: TransactionsService) {}
}
