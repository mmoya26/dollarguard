import { Component, HostListener, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '@interfaces/expense';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'monthly-stats',
  standalone: true,
  imports: [InputNumberModule, FormsModule,  CommonModule],
  templateUrl: './monthly-stats.component.html',
  styleUrl: './monthly-stats.component.css'
})
export class MonthlyStatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  monthlyBudget = 0;
  monthExpenses = 0;
  // highestExpense: {name: string, amount: number} | null = null;
  editingBudget = false;
  newBudgetAmount = 0;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.editingBudget) {
      this.toggleEditBudget();
    }
  }

  get runningTotal() {
    return Math.round(this.monthlyBudget - this.monthExpenses * 100) / 100;
  }

  get formattedBudget() {
    return new Intl.NumberFormat('en-US').format(this.monthlyBudget);
  }

  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.subscribe((expenses) => {
      // this.highestExpense = this.calculateHighestExpense(expenses);
      this.monthExpenses = this.expensesService.expensesTotalAmount;
    });

    this.subscription = this.userPreferencesService.currentUserBudget.subscribe(budget => {
      console.log('Updating budget', budget);
      this.monthlyBudget = budget;
      this.newBudgetAmount = budget;
    })
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

  toggleEditBudget() {
    this.editingBudget = !this.editingBudget;
  }

  adjustUserBudget() {
    if (this.newBudgetAmount !== this.monthlyBudget) {
      this.userPreferencesService.updateUserBudget(this.newBudgetAmount);
      this.toggleEditBudget();
    } else {
      console.log("Budget is the same no need to update...");
      this.toggleEditBudget();
    }
  }

  constructor(private expensesService: ExpensesService, private userPreferencesService: UserPreferencesService) {}
}
