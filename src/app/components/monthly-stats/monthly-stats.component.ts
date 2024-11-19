import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '@interfaces/expense';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'monthly-stats',
  standalone: true,
  imports: [InputNumberModule],
  templateUrl: './monthly-stats.component.html',
  styleUrl: './monthly-stats.component.css'
})
export class MonthlyStatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @ViewChild('budgetInput') budgetInput!: ElementRef;

  monthlyBudget = 4000.00;
  monthExpenses = 0;
  highestExpense: {name: string, amount: number} | null = null;

  editingBudget = false;

  get runningTotal() {
    return this.monthlyBudget - this.monthExpenses;
  }

  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.subscribe((expenses) => {
      this.highestExpense = this.calculateHighestExpense(expenses);
      this.monthExpenses = this.expensesService.expensesTotalAmount;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  focusBudgetInput() {
    this.budgetInput.nativeElement.focus();
  }

  calculateHighestExpense(expenses: Expense[]) {
    if (expenses.length === 0) return null;

    const amounts = expenses.map(e => e.amount);
    const categoryHighestAmount = Math.max(...amounts);
    const category = expenses.find(e => e.amount === categoryHighestAmount)!;
    return {name: category.category.name, amount: categoryHighestAmount};
  }

  editBudget() {
    this.editingBudget = true;
  }

  stopEditingBudget() {
    // this.editingBudget = false;
  }

  constructor(private expensesService: ExpensesService) {}
}
