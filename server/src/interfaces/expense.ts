import { Category } from "./category";

export interface Expense {
    id: string,
    userId: string,
    category: Category,
    amount: string,
    date: Date,
    note?: string    
}
