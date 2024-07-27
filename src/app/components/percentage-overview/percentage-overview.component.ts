import { Component, OnDestroy, OnInit } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { ExpensesService } from '../../services/expenses.service';
import { Category } from '@interfaces/category';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription = new Subscription();

  expenses: Expense[] = []

  activeCategories: ActiveCategory[] = [];

  expensesTotalAmount = 0;
  
  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.subscribe(expenses => {
      // debugger;
      this.expenses = expenses;
      this.expensesTotalAmount = this.expensesService.expensesTotalAmount;
      this.activeCategories = this.updateActiveCategories();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateActiveCategories(): ActiveCategory[] {
    // We create a need array instead of referencing the one in memory because if we don't create a new one
    // we will be changing but the reference and the original array which will trigger multiple rerenders
    let currentActiveCategories: ActiveCategory[] = [];

    this.expenses.forEach(e => {
      if (!this.isCategoryActive(e.category, currentActiveCategories)) {
        currentActiveCategories.push({ name: e.category.name, hexColor: e.category.hexColor, percentage: '0' });
      }
    })

    return this.calculateActiveCategoriesPercentages(currentActiveCategories);;
  }

  isCategoryActive(category: Category, currentActiveCategories: Category[]): boolean {
    return currentActiveCategories.findIndex(ac => ac.name === category.name) === -1 ? false : true;
  }

  calculateActiveCategoriesPercentages(currentActiveCategories: ActiveCategory[]): ActiveCategory[] {
    const newCalculatedCategories: ActiveCategory[] = currentActiveCategories.map(c => {
      let newActiveCategory: ActiveCategory = { ...c, percentage: String(this.categoryBarWidth(c.name)) }
      return newActiveCategory
    });

    return newCalculatedCategories;
  }

  categoryBarWidth(category: string) {
    return Math.round((this.getExpensesTotalAmountByCategory(category) / this.expensesTotalAmount) * 100);
  }


  getExpensesTotalAmountByCategory(category: string): number {
    let amount = 0;

    this.expenses.forEach(expense => {
      if (expense.category.name === category) {
        amount += Number(expense.amount);
      }
    });

    return amount;
  }

  constructor(private expensesService: ExpensesService) { }
}