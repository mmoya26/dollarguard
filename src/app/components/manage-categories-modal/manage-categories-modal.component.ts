import { Component, OnInit } from '@angular/core';
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

  isModalOpen = true

  currentUserCategories: Category[] = [];

  manageCategoriesForm = this.formBuilder.group({
    name: ['', Validators.required],
    hexColor: ['#574444', Validators.required],
  });


  ngOnInit(): void {
    this.userPreferencesService.currentuserCategories$.subscribe(categories => {
      this.currentUserCategories = categories;
    })
  }

  openModal() {
    this.isModalOpen = true;
  }

  
  onFormSubmit() {
    console.log('form submitteddd!!!');
  }

  deleteCategory(id: string) {
    console.log(`deleting category: ${id}`);
  }

  

  constructor(private formBuilder: FormBuilder, private userPreferencesService: UserPreferencesService) {}
}
