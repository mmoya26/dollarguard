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
    let returnArray: ActiveCategory[] = []

    this.expenses.forEach(e => {
      if (!this.activeCategories.some(activeCategory => activeCategory.name === e.category.name)) {
        returnArray.push({ name: e.category.name, hexColor: e.category.hexColor, percentage: '0' });
      }
    });

    return returnArray;
  }

  calculateActiveCategoriesPercentages() {
    let newCalculatedCategories: ActiveCategory[] = this.activeCategories.map(c => {
      let newActiveCategory: ActiveCategory = { ...c, percentage: String(this.categoryBarWidth(c.name)) }
      return newActiveCategory
    });

    this.activeCategories = [...newCalculatedCategories]
  }

  categoryBarWidth(category: string) {
    return Math.round((this.getTransactionsTotalAmountByCategory(category) / this.expensesTotalAmount) * 100);
  }


  getTransactionsTotalAmountByCategory(category: string): number {
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