import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { DatePipe } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'expenses-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input({required: true}) year!: string;
  @Input({required: true}) month!: string;

  expenses: Expense[] = [];

  ngOnInit(): void {
    this.subscription = this.expenseService.listOfExpenses$.subscribe(expenses => {
      this.expenses = expenses.reverse();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editExpense(expense: Expense) {
    this.expenseService.editExpense(expense);
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id)
  }

  constructor(private expenseService: ExpensesService) {}
}
