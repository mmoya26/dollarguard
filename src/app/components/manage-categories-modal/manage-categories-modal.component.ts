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
  @Output() closeModalEvent = new EventEmitter<void>();

  currentUserCategories: Category[] = [];

  readonly DEFAULT_COLOR_PICKER_COLOR = '#574444';

  manageCategoriesForm = this.formBuilder.group({
    name: ['', Validators.required],
    hexColor: [this.DEFAULT_COLOR_PICKER_COLOR, Validators.required],
  });

  isFormValid = true;

  ngOnInit(): void {
    this.userPreferencesService.currentuserCategories$.subscribe(categories => {
      
      this.currentUserCategories = categories;
    })
  }

  onFormSubmit() {
    if (this.manageCategoriesForm.invalid) {
      this.isFormValid = false;
      return;
    }

    this.isFormValid = true;

    this.userPreferencesService.addNewUserCategory({name: this.manageCategoriesForm.value.name!, hexColor: this.manageCategoriesForm.value.hexColor!}).subscribe();
    this.manageCategoriesForm.reset({ name:"", hexColor: this.DEFAULT_COLOR_PICKER_COLOR});
  }

  deleteCategory(name: string) {
    this.userPreferencesService.deleteUserCategory(name).subscribe();
  }

  closeModal() {
    this.closeModalEvent.emit();
    this.manageCategoriesForm.reset({ name:"", hexColor: this.DEFAULT_COLOR_PICKER_COLOR});
  }

  get category() {
    return this.manageCategoriesForm.get('name');
  }


  constructor(private formBuilder: FormBuilder, private userPreferencesService: UserPreferencesService) { }
}
