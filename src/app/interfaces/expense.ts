import {Category} from '@interfaces/category';

export interface Expense {
    id: string,
    userId: string,
    category: Category,
    amount: string,
    date: Date,
    note?: string    
}

export interface ExpenseDto {
    userId: string
    category: Category,
    amount: string,
    monthDay: string,
    notes?: string
}
