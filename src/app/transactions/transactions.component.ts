import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { Category } from '../interfaces/category';
import { CommonModule } from '@angular/common';
import { getCategoryColor } from '../helpers/getCategoryColor';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  @Input({required: true}) transactions!: Transaction[]

  editTransaction() {
    alert('Edit icon was clicked!');
  }

  getCategoryColor(name: string): string | undefined {
    return this.categoryService.getCategoryColor(name);
  }

  constructor(private categoryService: CategoryService) {}
}
