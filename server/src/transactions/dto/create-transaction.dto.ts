import { Category } from "@interfaces/category";

export class CreateTransactionDto {
  readonly userId: string;
  readonly transactionId: number;
  readonly category: Category;
  readonly amount: string;
  readonly date: string
  readonly note?: string
}