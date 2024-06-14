import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Transaction } from '@interfaces/transaction';;
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TransactionsService } from '../services/transactions.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'transactions',
  standalone: true,
  imports: [DatePipe, HttpClientModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  categoryService = inject(CategoryService);

  transactions: Transaction[] = [{
    userId: "ui1",
    transactionId: "1",
    amount: "100",
    date: "5/27/2024",
    category: {
      name: 'Gas',
      hexColor: '#DC2626'
    },
    note: "Test Notes"
  }]

  ngOnInit(): void {
    // this.sub = this.transactionsService.listOfTransactions$.subscribe(newTransactions => {
    //   this.transactions = newTransactions;
    // });

    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  editTransaction() {
    this.http.get('http://localhost:3000/').subscribe((data) => {
      this.transactions = <Transaction[]>data;
    });
  }

  constructor(private transactionsService: TransactionsService, private http: HttpClient) {}
}
