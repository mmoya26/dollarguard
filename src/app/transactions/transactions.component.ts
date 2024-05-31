import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { Category } from '../interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  @Input({required: true}) transactions!: Transaction[]
  @Input({required: true}) categories!: Category[];

  editTransaction() {
    alert('Edit icon was clicked!');
  }

  getCategoryColor(name: string): string | undefined {
    // Find the category who's name equals the name of the category about to be displayed
    const twClassName = this.categories.find(c => c.name === name);

    return twClassName?.hexColor
  }
}
