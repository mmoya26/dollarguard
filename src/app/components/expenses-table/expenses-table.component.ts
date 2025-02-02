import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { DatePipe } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { skip, Subscription } from 'rxjs';
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
  private subscriptions: Subscription[] = [];

  @Input({ required: true }) year!: string;
  @Input({ required: true }) month!: string;

  @Output() editExpenseEvent = new EventEmitter<void>();

  expenses: Expense[] = [];

  expensesLoading = true;

  deviceType: 'Desktop' | 'Tablet' | 'Mobile' = 'Desktop'; 

  ngOnInit(): void {
    this.subscriptions.push(this.expenseService.getExpenses(this.year, this.month).subscribe());

    // Skip the first event, because it's the initial value from the behavior subject being initialized
    this.subscriptions.push(this.expenseService.listOfExpenses$.pipe(skip(1)).subscribe(expenses => {
      this.expenses = expenses.reverse();
      this.expensesLoading = false;
    }));

    this.checkDeviceType();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkDeviceType();
  }

  checkDeviceType() {
    const width = window.innerWidth;

    if (width <= 600) {
      this.deviceType = 'Mobile';
      console.log('Mobile');
    } else if (width > 600 && width <= 1024) {
      this.deviceType = 'Tablet';
      console.log('Table');
    } else {
      this.deviceType = 'Desktop';
      console.log('Desktop');
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

  constructor(private expenseService: ExpensesService, private toastService: ToastService) { }
}
