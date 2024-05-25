import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'expense-form',
  standalone: true,
  imports: [KeyFilterModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, DropdownModule, CalendarModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  categories = ["Miscellaneous", "Gas", "Groceries", "Phone Bill", "Utilities"];
  
  blockSpaceAndOnlyAllowNumbers : RegExp = /^\d*\.?\d*$/;

  handleSubmit() {
    alert("Submitted!!!!");
  }
}
