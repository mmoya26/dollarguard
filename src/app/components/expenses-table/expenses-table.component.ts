import { Component, OnDestroy, OnInit, inject, Input } from '@angular/core';
import { Expense } from '@interfaces/expense';;
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'expenses-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent implements OnInit, OnDestroy {
  // private sub: Subscription = new Subscription();
  categoryService = inject(CategoryService);

  @Input({required: true}) expenses!: Expense[];

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  editTransaction() {
    
  }
}
