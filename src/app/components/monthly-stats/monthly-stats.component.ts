import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '@interfaces/expense';

@Component({
  selector: 'monthly-stats',
  standalone: true,
  imports: [],
  templateUrl: './monthly-stats.component.html',
})
export class MonthlyStatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  monthlyBudget = 4000.00;
  monthExpenses = 0;
  // highestExpense: {name: string, amount: number} | null = null;

  get runningTotal() {
    return Math.round(this.monthlyBudget - this.monthExpenses * 100) / 100;
  }

  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.subscribe((expenses) => {
      // this.highestExpense = this.calculateHighestExpense(expenses);
      this.monthExpenses = this.expensesService.expensesTotalAmount;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // calculateHighestExpense(expenses: Expense[]) {
  //   if (expenses.length === 0) return null;

  //   const amounts = expenses.map(e => e.amount);
  //   const categoryHighestAmount = Math.max(...amounts);
  //   const category = expenses.find(e => e.amount === categoryHighestAmount)!;
  //   return {name: category.category.name, amount: categoryHighestAmount};
  // }

  constructor(private expensesService: ExpensesService) {}
}
