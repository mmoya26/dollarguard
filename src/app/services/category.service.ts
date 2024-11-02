import { Injectable } from '@angular/core';
import { Category } from '@interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Find the category who's name equals the name of the category about to be displayed
  getCategoryColor(categories: Category[], name: string): string {
    const hexColor = categories.find(c => c.name === name)!.hexColor;

    return hexColor;
  }
  
  constructor() { }
}
