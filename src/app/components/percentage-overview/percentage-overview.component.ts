import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '@interfaces/expense';;
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
export class PercentageOverviewComponent implements OnInit {
  @Input({ required: true }) expenses!: Expense[]

  activeCategories: ActiveCategory[] = [];

  expensesTotalAmount = 0;

  ngOnInit(): void {
    this.expensesTotalAmount = this.expensesService.calculateTotalAmount(this.expenses);
    this.activeCategories = this.updateActiveCategories();
    this.calculateActiveCategoriesPercentages();
  }

  updateActiveCategories(): ActiveCategory[] {
    // We create a need array instead of referencing the one in memory because if we don't create a new one
    // we will be changing but the reference and the original array which will trigger multiple rerenders
    let currentActiveCategories = [...this.activeCategories];
    
    this.expenses.forEach(e => {
      if (!this.isCategoryActive(e.category, currentActiveCategories)) {
        currentActiveCategories.push({ name: e.category.name, hexColor: e.category.hexColor, percentage: '0' });
      }
    })

    return currentActiveCategories;
  }

  isCategoryActive(category: Category, currentActiveCategories: Category[]): boolean {
    return currentActiveCategories.findIndex(ac => ac.name === category.name) === -1 ? false : true;
  }

  calculateActiveCategoriesPercentages() {
    let newCalculatedCategories: ActiveCategory[] = this.activeCategories.map(c => {
      let newActiveCategory: ActiveCategory = { ...c, percentage: String(this.categoryBarWidth(c.name)) }
      return newActiveCategory
    });

    this.activeCategories = [...newCalculatedCategories]
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