import { Component, EventEmitter, Output } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import {FormBuilder,  FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { Transaction } from '../interfaces/transaction';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, KeyFilterModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {

  // Create output property to emmit an event of type transaction whenever the form gets submitted
  @Output('expenseSubmitted') submit = new EventEmitter<Transaction>();

  categories = ["Miscellaneous", "Gas", "Groceries", "Phone Bill", "Utilities"];
  
  blockSpaceAndOnlyAllowNumbers : RegExp = /^\d*\.?\d*$/;

  expenseForm = this.formBuilder.group({
    category: ['', Validators.required],
    amount: ['',  Validators.required],
    date: ['',  Validators.required],
    note: ['']
  });

  get category() {
    return this.expenseForm.get('category');
  }

  get amount() {
    return this.expenseForm.get('amount');
  }

  get date() {
    return this.expenseForm.get('date');
  }

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    
    if (!this.expenseForm.invalid) {
      // Emit submit event when the form is valid with the current value of all Form Controls
      // from our form casted to be a Transaction
      this.submit.emit(<Transaction>this.expenseForm.value)
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
