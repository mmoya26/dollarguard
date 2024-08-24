import { Category } from "@interfaces/category";
import { IsNotEmpty, IsString, IsOptional, IsNumberString, Min, IsNumber, Max} from 'class-validator'
import { IsCategory } from "./validator/is-category.decorator";

export class ExpenseDto {
  @IsCategory()
  @IsNotEmpty()
  readonly category: Category;

  @Min(1)
  @Max(999999)
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