import { Component, Input } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { Category } from '../interfaces/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'percentage-overview',
  standalone: true,
  imports: [],
  templateUrl: './percentage-overview.component.html',
  styleUrl: './percentage-overview.component.css'
})
export class PercentageOverviewComponent {
  @Input({required: true}) transactions!: Transaction[];

  getCategoryColor(name: string): string | undefined {
    return this.categoryService.getCategoryColor(name);
  }
  
  constructor(private categoryService: CategoryService) {}
}
