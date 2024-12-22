import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { CommonModule } from '@angular/common';
import { UpdateBudgetDto } from '@interfaces/user-preferences';

@Component({
  selector: 'monthly-stats',
  standalone: true,
  imports: [InputNumberModule, FormsModule, CommonModule],
  templateUrl: './monthly-stats.component.html',
  styleUrl: './monthly-stats.component.css'
})
export class MonthlyStatsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input({ required: true }) year!: string;
  @Input({ required: true }) month!: string;

  monthlyBudget: number | null = null;
  monthExpenses = 0;
  newBudgetAmount = 0;
  runningTotal = 0;
  isUserEditingBudget = false;

  // highestExpense: {name: string, amount: number} | null = null;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isUserEditingBudget) {
      this.isUserEditingBudget = false;
    }
  }

  get formattedBudget() {
    return new Intl.NumberFormat('en-US').format(this.monthlyBudget ?? 0);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.expensesService.listOfExpenses$.subscribe((_) => {
        // this.highestExpense = this.calculateHighestExpense(expenses);
        this.monthExpenses = this.expensesService.expensesTotalAmount;
        this.runningTotal = (this.monthlyBudget || 0) - this.monthExpenses;
      })
    );

    this.subscriptions.push(
      this.userPreferencesService.currentUserBudget.subscribe(budget => {
        console.log('Updating budget', budget);
        this.monthlyBudget = budget;
        this.newBudgetAmount = budget;
        this.runningTotal = (this.monthlyBudget || 0) - this.monthExpenses;
      })
    );

    this.subscriptions.push(this.userPreferencesService.getUserBudget(this.year, this.month).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // calculateHighestExpense(expenses: Expense[]) {
  //   if (expenses.length === 0) return null;

  //   const amounts = expenses.map(e => e.amount);
  //   const categoryHighestAmount = Math.max(...amounts);
  //   const category = expenses.find(e => e.amount === categoryHighestAmount)!;
  //   return {name: category.category.name, amount: categoryHighestAmount};
  // }

  editBudget() {
    this.isUserEditingBudget = true;

    // set the new budget to be the current budget in case the user starts typing and doesn't save 
    this.newBudgetAmount = this.monthlyBudget ?? 0;

    // Focus the budget input field when the user starts editing
    setTimeout(() => {
      const input = document.querySelector('#editBudgetInputChild') as HTMLInputElement;

      if (input) {
        input.focus();
      }

    }, 100);
  }

  handleBudgetChanges() {
    if (this.newBudgetAmount !== this.monthlyBudget) {

      const updateBudgetDto: UpdateBudgetDto = {
        year: this.year,
        month: this.month,
        newAmount: this.newBudgetAmount  
      }
      
      this.userPreferencesService.updateUserBudget(updateBudgetDto).subscribe();
    }

    this.isUserEditingBudget = false;
  }

  constructor(private expensesService: ExpensesService, private userPreferencesService: UserPreferencesService) { }
}
