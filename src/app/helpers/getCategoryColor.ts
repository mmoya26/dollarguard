import { Category } from "../interfaces/category";

// Find the category who's name equals the name of the category about to be displayed
export function getCategoryColor(name: string, categories: Category[]): string | undefined {
    
    // I'M TELLING TYPESCRIPT THIS WILL ALWAYS FIND A VALUE CARE
    const category: Category = categories.find(c => c.name === name)!;

    return category?.hexColor;
}