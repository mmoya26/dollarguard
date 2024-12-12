import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
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

  @Input({required: true}) isUserEditingBudget!: boolean;

  @Output() toggleUserEditingBudgetEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('budgetInput') budgetInput!: ElementRef;

  monthlyBudget: number | null = null;
  monthExpenses = 0;
  newBudgetAmount = 0;
  runningTotal = 0;

  // highestExpense: {name: string, amount: number} | null = null;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isUserEditingBudget) {
      this.toggleUserEditingBudgetEvent.emit();
    }
  }

  get formattedBudget() {
    return new Intl.NumberFormat('en-US').format(this.monthlyBudget ?? 0);
  }

  ngOnInit(): void {
    this.subscription = this.expensesService.listOfExpenses$.subscribe((expenses) => {
      // this.highestExpense = this.calculateHighestExpense(expenses);
      this.monthExpenses = this.expensesService.expensesTotalAmount;
      this.runningTotal = (this.monthlyBudget || 0) - this.monthExpenses;
    });

    this.subscription = this.userPreferencesService.currentUserBudget.subscribe(budget => {
      console.log('Updating budget', budget);
      this.monthlyBudget = budget;
      this.newBudgetAmount = budget;
      this.runningTotal = (this.monthlyBudget || 0) - this.monthExpenses;
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

  triggerBudgetEditingEvent() {
    this.toggleUserEditingBudgetEvent.emit();

    // TODO: figure out how to focus primeng nested input when toggling the editing budget event
  }

  adjustUserBudget() {
    if (this.newBudgetAmount !== this.monthlyBudget) {
      this.userPreferencesService.updateUserBudget(this.newBudgetAmount); 
    }

    this.toggleUserEditingBudgetEvent.emit();
  }

  constructor(private expensesService: ExpensesService, private userPreferencesService: UserPreferencesService) {}
}
