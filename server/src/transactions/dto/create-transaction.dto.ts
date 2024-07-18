import { Category } from "@interfaces/category";
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator'
import { IsCategory } from "./validator/is-category.decorator";
import {Type} from 'class-transformer'

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
  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @IsOptional()
  @IsString()
  readonly note?: string
}