import {Category} from '@interfaces/category';

export interface Expense {
    id: string,
    userId: string,
    category: Category,
    amount: number,
    date: Date,
    notes?: string    
}

export interface ExpenseDto {
    userId: string
    category: Category,
    amount: number,
    monthDay: string,
    notes?: string
}
