import { Component, Input, OnDestroy, OnInit, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { DatePipe } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'expenses-table',
  standalone: true,
  imports: [DatePipe, ToastModule, SkeletonModule],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input({required: true}) year!: string;
  @Input({required: true}) month!: string;

  @Output() editExpenseEvent = new EventEmitter<void>(); 

  expenses: Expense[] = [];

  isLoading = true;

  ngOnInit(): void {
    this.subscription = this.expenseService.listOfExpenses$.subscribe(expenses => {
      this.expenses = expenses.reverse();
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editExpense(expense: Expense) {
    this.expenseService.editExpense(expense);
    this.editExpenseEvent.emit();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe(
      {
        error: (e) => {
          console.log('Error when deleting an expense: ', e);
          this.toastService.createToastMessage('error', 'Error', 'Unable to delete expense');
        }
      }
    );
    
  }

  formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US').format(amount);
  }

  get transactionsCount() {
    return this.expenses.length;
  }

  constructor(private expenseService: ExpensesService, private toastService: ToastService, private el: ElementRef) {}
}
