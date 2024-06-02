import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [
    {
      name: "Miscellaneous",
      hexColor: "#475569",
    },
    {
      name: "Gas",
      hexColor: "#DC2626",
    },
    {
      name: "Utilities",
      hexColor: "#0891B2",
    },
    {
      name: "Groceries",
      hexColor: "#D97706",
    },
    {
      name: "Phone Bill",
      hexColor: "#4F46E5",
    }
  ]

  // Find the category who's name equals the name of the category about to be displayed
  getCategoryColor(name: string): string | undefined {
    const category = this.categories.find(c => c.name === name);

    return category?.hexColor
  }

  constructor() { }
}
