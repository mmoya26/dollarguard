import { Component, OnDestroy, OnInit } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { Category } from '@interfaces/category';

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

  ngOnInit(): void {
    // this.sub = this.transactionsService.listOfTransactions$.subscribe(newTransactions => {
    //   this.updateActiveCategories(newTransactions);
    //   this.calculateActiveCategoriesPercentages();
    // });    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateActiveCategories(transactions: Expense[]) {
    transactions.forEach(t => {
      if (!this.activeCategories.some(activeCategory => activeCategory.name === t.category.name)) {
        console.log("Updating Active Categories...");
        this.activeCategories.push({name: t.category.name, hexColor: t.category.hexColor, percentage: '0'});
      }
    });
  }

  calculateActiveCategoriesPercentages() {
    console.log("Calculating Active Categories percentages...");
    let newCalculatedCategories: ActiveCategory[] = this.activeCategories.map(c => {
      let newActiveCategory: ActiveCategory = {...c, percentage: String(this.categoryBarWidth(c.name))}
      return newActiveCategory
    });

    this.activeCategories = [...newCalculatedCategories]
  }

  categoryBarWidth(category: string) {
    // return Math.round((this.expensesService.getTransactionsTotalAmountByCategory(category) / this.expensesService.transactionsTotalAmount) * 100);
  }
  
  constructor(private expensesService: ExpensesService) {}
}
