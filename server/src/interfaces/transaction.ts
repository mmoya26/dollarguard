import { Category } from "./category";

export interface Transaction {
    userId: string,
    transactionId: string,
    category: Category,
    amount: string,
    date: string,
    note?: string
}
