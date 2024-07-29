import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '@interfaces/category';
import { CategoryService } from '../../services/category.service';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseDto } from '@interfaces/expense';
import { Subscription } from 'rxjs';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, KeyFilterModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) month = ''
  @Input({ required: true }) year = ''

  currentExpenseSubscription: Subscription = new Subscription();

  minDate = new Date();
  maxDate = new Date();

  categories: Category[] = [];

  blockSpaceAndOnlyAllowNumbers: RegExp = /^\d*\.?\d*$/;

  isEditingExpense = false;

  expenseForm = this.formBuilder.group({
    category: ['', Validators.required],
    amount: ['', Validators.required],
    date: ['', Validators.required],
    notes: ['']
  });

  ngOnInit(): void {
    this.currentExpenseSubscription = this.expensesService.currentExpense$.subscribe(expense => {
      // Use this as an indicator to know if this is the first time the subscription is being ran
      // We don't want to run the code below this line if it is the first time
      if (this.categories.length === 0) return;

      this.expenseForm.controls['category'].setValue(expense.category);
      this.expenseForm.controls['amount'].setValue(expense.amount);
      this.expenseForm.controls['date'].setValue(expense.date);
      this.expenseForm.controls['notes'].setValue(expense.notes);

      this.isEditingExpense = true;
    });

    this.categories = this.categoryService.getAllCategories();
    this.setMinAndMaxCalendarDates(this.month, this.year);
  }

  ngOnDestroy(): void {
    if (this.currentExpenseSubscription) {
      this.currentExpenseSubscription.unsubscribe();
    }
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
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return
    }


    let newExpense: ExpenseDto = {
      userId: 'ui22',
      amount: this.expenseForm.value?.amount || '0',
      category: {
        name: this.expenseForm.value?.category || 'NO COLOR',
        hexColor: this.categoryService.getCategoryColor(this.expenseForm.value.category!) || '#2e1d14'
      },
      monthDay: String(new Date(this.expenseForm.value.date!).getDate()),
      notes: this.expenseForm.value.notes || ""
    }

    if (this.isEditingExpense) {
      console.log("HTTP PATCH CALL");
      this.stopEditing();
    } else {
      this.expensesService.addExpense(newExpense, this.year, this.month);
    }

    this.clear();
  }

  clear() {
    this.expenseForm.reset({ amount: '', category: '', date: '', notes: '' });
  }

  stopEditing() {
    this.isEditingExpense = false;
    this.clear();
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

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private expensesService: ExpensesService) { }
}
