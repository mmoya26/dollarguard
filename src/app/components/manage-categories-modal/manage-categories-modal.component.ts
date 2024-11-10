import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CommonModule } from '@angular/common';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { Category } from '@interfaces/category';

@Component({
  selector: 'app-manage-categories-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DialogModule, CommonModule, ColorPickerModule],
  templateUrl: './manage-categories-modal.component.html',
  styleUrl: './manage-categories-modal.component.css'
})
export class ManageCategoriesModalComponent implements OnInit {

  @Input({ required: true }) isModalOpen = true
  @Output() closeModalEvent = new EventEmitter<boolean>();

  currentUserCategories: Category[] = [];

  manageCategoriesForm = this.formBuilder.group({
    name: ['', Validators.required],
    hexColor: ['#574444', Validators.required],
  });

  isFormValid = true;

  ngOnInit(): void {
    this.userPreferencesService.currentuserCategories$.subscribe(categories => {
      
      this.currentUserCategories = categories;
    })
  }

  onFormSubmit() {
    if (this.manageCategoriesForm.invalid) {
      console.log('here')
      this.isFormValid = false;
      return;
    }

    this.isFormValid = true;

    this.userPreferencesService.addNewUserCategory({name: this.manageCategoriesForm.value.name!, hexColor: this.manageCategoriesForm.value.hexColor!})
  }

  deleteCategory(id: string) {
    console.log(`deleting category: ${id}`);
  }

  closeModal() {
    this.closeModalEvent.emit(true);
  }

  get category() {
    return this.manageCategoriesForm.get('name');
  }


  constructor(private formBuilder: FormBuilder, private userPreferencesService: UserPreferencesService) { }
}
