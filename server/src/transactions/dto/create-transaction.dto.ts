import { Category } from "@interfaces/category";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator'
import { IsCategory } from "./validator/is-category.decorator";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly transactionId: number;

  @IsCategory()
  @IsNotEmpty()
  readonly category: Category;

  @IsString()
  @IsNotEmpty()
  readonly amount: string;

  @IsString()
  @IsNotEmpty()
  readonly date: string

  @IsOptional()
  @IsString()
  readonly note?: string
}