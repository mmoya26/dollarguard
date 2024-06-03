import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  categoryService = inject(CategoryService);

  transactions: Transaction[] = []

  ngOnInit(): void {
    this.sub = this.transactionsService.listOfTransactions$.subscribe(newTransactions => {
      this.transactions = newTransactions;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  editTransaction() {
    alert('Edit icon was clicked!');
  }

  constructor(private transactionsService: TransactionsService) {}
}
