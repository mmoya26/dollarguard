import { Category } from "@interfaces/category";
import { IsNotEmpty, IsString, IsOptional, IsNumberString} from 'class-validator'
import { IsCategory } from "./validator/is-category.decorator";

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsCategory()
  @IsNotEmpty()
  readonly category: Category;

  @IsString()
  @IsNotEmpty()
  readonly amount: string;

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

  @IsString()
  @IsNotEmpty()
  readonly amount: string;

  @IsNumberString()
  @IsNotEmpty()
  readonly monthDay: string;

  @IsOptional()
  @IsString()
  readonly notes?: string
}