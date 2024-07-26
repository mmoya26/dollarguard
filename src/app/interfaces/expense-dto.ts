import { Category } from "@interfaces/category"

export interface ExpenseDto {
    userId: string
    category: Category,
    amount: string,
    monthDay: string,
    notes?: string
}
