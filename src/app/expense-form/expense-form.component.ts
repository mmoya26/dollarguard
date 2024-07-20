import { Component, Input, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Transaction } from '@interfaces/transaction';
import { Category } from '@interfaces/category';
import { CategoryService } from '../services/category.service';
import { TransactionsService } from '../services/transactions.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, KeyFilterModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {
  @Input({required: true}) month = ''
  @Input({required: true}) year = ''

  minDate = new Date();
  maxDate = new Date();

  categories: Category[] = [];

  blockSpaceAndOnlyAllowNumbers: RegExp = /^\d*\.?\d*$/;

  expenseForm = this.formBuilder.group({
    id: uuidv4(),
    category: ['', Validators.required],
    amount: ['', Validators.required],
    date: ['', Validators.required],
    note: ['']
  });

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategories();
    this.setMinAndMaxCalendarDates(this.month, this.year);
  }

  get category() {
    return this.expenseForm.get('category');
  }

  get amount() {
    return this.expenseForm.get('amount');
  }

  get date() {
    return this.expenseForm.get('date');
  }

  setMinAndMaxCalendarDates(m: string, y: string) {
    this.minDate = new Date(Number(this.year), Number(this.month) - 1, 1);
    this.maxDate = new Date(Number(this.year), Number(this.month), 0);
  }

  onSubmit() {
    if (!this.expenseForm.invalid) {
      // Care for this statement, essentially we are saying this values are always going to be there when we access them...
      let transaction = {...this.expenseForm.value, category: {name: this.expenseForm.value.category, hexColor: this.categoryService.getCategoryColor(this.expenseForm.value.category!)}}
      this.transactionsService.addTransaction(<Transaction>transaction);
      this.clear();
    } else {
      console.log("Form is invalid");
      this.expenseForm.markAllAsTouched();
    }
  }

  clear() {
    this.expenseForm.reset({ amount: '', id: uuidv4(), category: '', date: '', note: '' });
  }

  // Format date to not include names and only numbers mm/dd/yyyy before setting Date Form control
  onDateSelect(date: Date) {
    this.expenseForm.controls['date'].setValue(date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric', }));
  }

  // Format the category so that is able to be set to the form group
  onCategorySelect(categoryName: DropdownChangeEvent) {
    this.expenseForm.controls['category'].setValue(categoryName.value);
    return categoryName.value;
  }

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private transactionsService: TransactionsService) { }
}
