import { Category } from "./category";

export interface Transaction {
    id: string,
    category: Category,
    amount: string,
    date: string,
    note?: string
}
