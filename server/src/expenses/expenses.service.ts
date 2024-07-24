import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from "./schemas/expense.schema";
import { SearchForExpensesParams } from '../interfaces/searchForExpensesParams';
import { isValidDate, isValidMonth } from './helpers/dateFunctions';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto, {year, month}: SearchForExpensesParams): Promise<Expense> {
    if (!isValidDate(createExpenseDto.monthDay, Number(month) - 1, year)) throw new HttpException('Expense could not be added', 400);

    const newExpense = new this.expenseModel(createExpenseDto);
    newExpense.date = new Date(`${month}/${createExpenseDto.monthDay}/${year}`);

    return newExpense.save();
  }

  async getExpenses(): Promise<Expense[]> {
    return this.expenseModel.find();
  }

  async getExpenseById(id: string): Promise<Expense> {
    return this.expenseModel.findById(id);
  }

  async getExpensesByYearAndMonth({year, month} : SearchForExpensesParams): Promise<Expense[]> {
    if (!isValidMonth(month)) throw new HttpException('Unable to get expenses', 400);

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);

    return this.expenseModel.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
  }
}