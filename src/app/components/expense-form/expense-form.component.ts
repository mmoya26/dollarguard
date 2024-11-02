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
import { skip, Subscription } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';
import { UserPreferencesService } from '../../services/user-preferences.service';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, KeyFilterModule, FloatLabelModule,
    InputGroupModule, InputGroupAddonModule, InputTextModule, DropdownModule, CalendarModule, InputNumberModule, ToastModule],
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

  isEditingExpense = false;

  toastType: 'success' | 'error' = 'success';

  expenseForm = this.formBuilder.group({
    category: ['', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(1), Validators.max(999999)]],
    date: ['', Validators.required],
    notes: ''
  });

  ngOnInit(): void {
    this.currentExpenseSubscription = this.expensesService.currentExpenseBeingEdited$
      .pipe(skip(1)) // Skip the first suscribe to no have to set the fields to empty again
      .subscribe(expense => {
        this.expenseForm.controls['category'].setValue(expense.category);
        this.expenseForm.controls['amount'].setValue(expense.amount);
        this.expenseForm.controls['date'].setValue(expense.date);
        this.expenseForm.controls['notes'].setValue(expense.notes);

        this.isEditingExpense = true;

      });

    this.userPreferencesService.currentuserCategories$.subscribe(categories => {
      this.categories = categories;
    })
    
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
      console.log("Form is invalid");
      this.expenseForm.markAllAsTouched();
      return
    }

    let transferedExpense: ExpenseDto = {
      amount: Number(this.expenseForm.value.amount)!,
      category: {
        name: this.expenseForm.value.category!,
        hexColor: this.categoryService.getCategoryColor(this.categories, this.expenseForm.value.category!)!
      },
      monthDay: String(new Date(this.expenseForm.value.date!).getDate()),
      notes: this.expenseForm.value.notes || ''
    }

    if (this.isEditingExpense) {

      this.expensesService.updateExpense(this.expensesService.expenseBeingEditedId, transferedExpense, this.year, this.month).subscribe({
        next: () => {
          this.toastType = 'success';
          this.displayToastMessage('Success', 'Update');
        },
        error: (e) => {
          this.toastType = 'error';
          console.log('Error when updating an expense', e);
          this.displayToastMessage('Error', 'Update');
        },
      });

      this.stopEditing();
    } else {
      this.expensesService.addExpense(transferedExpense, this.year, this.month).subscribe({
        next: () => {
          this.toastType = 'success';
          this.displayToastMessage('Success', 'Added');
        },

        error: (e) => {
          this.toastType = 'error';
          console.log('Error when updating an expense', e);
          this.displayToastMessage('Error', 'Added');
        }
      });
    }

    this.clearForm();
  }

  clearForm() {
    this.expenseForm.reset({ amount: null, category: '', date: '', notes: '' });
  }

  stopEditing() {
    this.isEditingExpense = false;
    this.clearForm();
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

  displayToastMessage(severity: 'Error' | 'Success', toastTransactionType: 'Delete' | 'Added' | 'Update') {

    const messages = {
      'Delete': {
        Error: 'Unable to delete expense',
        Success: 'Expense deleted successfully'
      },
      'Added': {
        Error: 'Unable to add expense',
        Success: 'Expense added successfully'
      },
      'Update': {
        Error: 'Unable to update expense',
        Success: 'Expense updated successfully'
      }
    }
    
    this.toastService.createToastMessage(severity, severity, messages[toastTransactionType][severity])
  }

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoryService, 
    private expensesService: ExpensesService, 
    private toastService: ToastService,
    private userPreferencesService: UserPreferencesService
  ) { }
}
