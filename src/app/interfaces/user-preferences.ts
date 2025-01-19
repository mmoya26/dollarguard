import { Category } from "./category"

export interface NewCategoryDto {
    name: string,
    hexColor: string
}

export interface UpdateBudgetDto {
    year: string,
    month: string,
    newAmount: number
}

export interface UserPreferences {
    id: string,
    userId: string,
    budgets?: Map<string, Map<string, number>>,
    categories: Category[],
    activeYears?: string[]
}