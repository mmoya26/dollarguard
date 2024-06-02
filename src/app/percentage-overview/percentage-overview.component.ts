import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { CategoryService } from '../services/category.service';

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
export class PercentageOverviewComponent implements OnInit {
  @Input({required: true}) transactions!: Transaction[];

  activeCategories: ActiveCategory[] = [];
  transactionsTotal = 0;

  getCategoryColor(name: string): string | undefined {
    return this.categoryService.getCategoryColor(name);
  }

  calculatePercentages(name: string) {
    let categoryAmount = this.activeCategories.find(c => c.name  === name)?.amount || 0;
    return (categoryAmount / this.transactionsTotal) * 100;
  }

  ngOnInit(): void {
    // Loop through all transactions and set to activeCategories to later generate percentages "more easily"
    this.transactions.forEach(t => {
      // If the category already exists
      if (!this.activeCategories.some(category => category.name === t.category)) {
        this.activeCategories.push({name: t.category, amount: Number(t.amount), percentage: "0"});
      } else {
        let cIndex = this.activeCategories.findIndex(c => c.name === t.category);
        this.activeCategories[cIndex].amount += Number(t.amount);
      }

      this.transactionsTotal += Number(t.amount);
    });
  }
  
  constructor(private categoryService: CategoryService) {}
}
