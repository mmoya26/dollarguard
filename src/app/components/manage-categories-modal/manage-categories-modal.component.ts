import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CommonModule } from '@angular/common';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { Category } from '@interfaces/category';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { startsOrEndsWithWhitespace } from '@helpers/startsOrEndsWithWhitespace';
import { hasMultipleSpaces } from '@helpers/hasMultipleSpaces';

@Component({
  selector: 'app-manage-categories-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DialogModule, CommonModule, ColorPickerModule],
  templateUrl: './manage-categories-modal.component.html',
  styleUrl: './manage-categories-modal.component.css'
})
export class ManageCategoriesModalComponent implements OnInit {

  @Input({ required: true }) isModalOpen = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  currentUserCategories: Category[] = [];

  readonly DEFAULT_COLOR_PICKER_COLOR = '#574444';

  manageCategoriesForm = this.formBuilder.group({
    name: ['', Validators.required],
    hexColor: [this.DEFAULT_COLOR_PICKER_COLOR, Validators.required],
  });

  isFormValid = true;
  categoryExistError = false;
  categoryNameFormatError = false;

  ngOnInit(): void {
    this.userPreferencesService.currentuserCategories$.subscribe(categories => {
      
      this.currentUserCategories = categories;
    });

    this.manageCategoriesForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      if (this.doesCategoryExist(value.name ?? '')) {
        this.categoryExistError = true;
      } else {
        this.categoryExistError = false;
      }
    })
  }

  onFormSubmit() {
    if (this.manageCategoriesForm.invalid) {
      this.isFormValid = false;
      return;
    }

    if (this.doesCategoryExist(this.manageCategoriesForm.value.name!)) {
      this.categoryExistError = true;
      return;
    }

    if (startsOrEndsWithWhitespace(this.manageCategoriesForm.value.name!) || hasMultipleSpaces(this.manageCategoriesForm.value.name!)) {
      this.categoryNameFormatError = true;
      return;
    }

    this.resetErrors();

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

  doesCategoryExist(name: string) {
    if (name === '') return false;
    return this.currentUserCategories.some(category => category.name.toLowerCase() === name.toLowerCase());
  }

  resetErrors() {
    this.categoryExistError = false;
    this.categoryNameFormatError = false;
    this.isFormValid = true;
  }

  get category() {
    return this.manageCategoriesForm.get('name');
  }


  constructor(private formBuilder: FormBuilder, private userPreferencesService: UserPreferencesService) { }
}
