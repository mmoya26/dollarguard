import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Expense } from '@interfaces/expense';
import { DatePipe } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { map, skip, Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'expenses-table',
  standalone: true,
  imports: [DatePipe, ToastModule, SkeletonModule],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css',
})
export class ExpensesTableComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];

  @Input({ required: true }) year!: string;
  @Input({ required: true }) month!: string;

  @Output() editExpenseEvent = new EventEmitter<void>();

  expenses: Expense[] = [];

  expensesLoading = true;

  ngOnInit(): void {
    this.subscriptions.push(this.expenseService.getExpenses(this.year, this.month).subscribe());

    // Skip the first event, because it's the initial value from the behavior subject being initialized
    this.subscriptions.push(this.expenseService.listOfExpenses$.pipe(
      skip(1),
      map(expenses => this.sortExpenses(expenses))
    ).subscribe(expenses => {
      this.expenses = expenses.reverse();
      this.expensesLoading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  sortExpenses(expenses: Expense[]) {
    return expenses.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  formatAmount(amount: number) {
    return new Intl.NumberFormat('en-US').format(amount);
  }

  get transactionsCount() {
    return this.expenses.length;
  }

  constructor(private expenseService: ExpensesService, private toastService: ToastService) { }
}
