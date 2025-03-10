import { Component, OnDestroy, OnInit } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { ExpensesService } from '../../services/expenses.service';
import { Category } from '@interfaces/category';
import { skip, Subscription } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { CurrencyPipe } from '@angular/common';

interface ActiveCategory extends Category {
  percentage: number,
  expensesAmount: number
}

@Component({
    selector: 'percentage-overview',
    standalone: true,
    imports: [SkeletonModule, CurrencyPipe],
    templateUrl: './percentage-overview.component.html'
})
export class PercentageOverviewComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  expenses: Expense[] = []

  activeCategories: ActiveCategory[] = [];

  expensesTotalAmount = 0;

  calculatingPercentages = true;

  showPercentages = true;
  
  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.pipe(skip(1)).subscribe(expenses => {
      debugger;
      this.expenses = expenses;
      this.expensesTotalAmount = this.expensesService.expensesTotalAmount;
      this.activeCategories = this.updateActiveCategories();
      this.calculatingPercentages = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateActiveCategories(): ActiveCategory[] {
    if (this.expenses.length === 0) {
      return [];
    }

    let tempActiveCategories: ActiveCategory[] = [];

    this.expenses.forEach(e => {
      if (!this.isCategoryActive(e.category, tempActiveCategories)) {
        tempActiveCategories.push({ name: e.category.name, hexColor: e.category.hexColor, percentage: 0, expensesAmount: 0 });
      }
    })

    return this.calculatePercentagesAndAmount(tempActiveCategories);;
  }

  isCategoryActive(category: Category, tempActiveCategories: ActiveCategory[]): boolean {
    return tempActiveCategories.findIndex(ac => ac.name === category.name) === -1 ? false : true;
  }

  calculatePercentagesAndAmount(tempActiveCategories: ActiveCategory[]): ActiveCategory[] {
    const newCalculatedCategories: ActiveCategory[] = tempActiveCategories.map(c => {
      const { categoryExpenseAmount, categoryPercentage } = this.calculateCategoryStats(c);
      let newActiveCategory: ActiveCategory = { ...c, percentage: categoryPercentage, expensesAmount: categoryExpenseAmount};
      return newActiveCategory
    });

    return newCalculatedCategories;
  }

  calculateCategoryStats(category: Category): {categoryExpenseAmount: number, categoryPercentage: number } {
    let percentageAmount = 0;
    let expensesAmount = 0;

    this.expenses.forEach(expense => {
      if (expense.category.name === category.name) {
        percentageAmount += Number(expense.amount);
        expensesAmount += expense.amount;
      }
    });

    return {categoryExpenseAmount: expensesAmount, categoryPercentage: Math.round((percentageAmount / this.expensesTotalAmount) * 100)};
  }

  constructor(private expensesService: ExpensesService) { }
}