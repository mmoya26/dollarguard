import { Category } from "@interfaces/category";
import { IsNotEmpty, IsString, IsOptional, IsNumberString, Min, IsNumber} from 'class-validator'
import { IsCategory } from "./validator/is-category.decorator";

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsCategory()
  @IsNotEmpty()
  readonly category: Category;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumberString()
  @IsNotEmpty()
  readonly monthDay: string;

  @IsOptional()
  @IsString()
  readonly notes?: string
}

export class UpdateExpenseDto {
  @IsCategory()
  @IsNotEmpty()
  readonly category: Category;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumberString()
  @IsNotEmpty()
  readonly monthDay: string;

  @IsOptional()
  @IsString()
  readonly notes?: string
}