import { Component, Input } from '@angular/core';
import { Transaction } from '../interfaces/transaction';

@Component({
  selector: 'transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  @Input({required: true}) transactions!: Transaction[]

  editTransaction() {
    alert('Edit icon was clicked!');
  }
}
