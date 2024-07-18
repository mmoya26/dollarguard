import { Category } from "@interfaces/category";
import { IsNotEmpty, IsString, IsOptional, IsNumberString} from 'class-validator'
import { IsCategory } from "./validator/is-category.decorator";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsCategory()
  @IsNotEmpty()
  readonly category: Category;

  @IsString()
  @IsNotEmpty()
  readonly amount: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly monthDay: string;

  @IsOptional()
  @IsString()
  readonly note?: string
}