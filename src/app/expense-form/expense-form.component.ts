import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import {FormBuilder,  FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, KeyFilterModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  categories = ["Miscellaneous", "Gas", "Groceries", "Phone Bill", "Utilities"];
  
  blockSpaceAndOnlyAllowNumbers : RegExp = /^\d*\.?\d*$/;

  expenseForm = this.formBuilder.group({
    category: ['', Validators.required],
    amount: ['',  Validators.required],
    date: ['',  Validators.required],
    note: ['']
  })

  get category() {
    return this.expenseForm.get('category');
  }

  get amount() {
    return this.expenseForm.get('amount');
  }

  get date() {
    return this.expenseForm.get('date');
  }

  onSubmit() {
    if (!this.expenseForm.invalid) {
      console.log("form is valid!!");
    } else {
      console.log("Form is invalid");
      this.expenseForm.markAllAsTouched();
    }
  }

  // Format date to not include names and only numbers mm/dd/yyyy before setting Date Form control
  onDateSelect(date : Date) {
    this.expenseForm.controls['date'].setValue(date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric', }));
  }

  constructor(private formBuilder: FormBuilder) {}
}
