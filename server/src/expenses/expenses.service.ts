import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { Expense } from "./schemas/expense.schema";
import { ExpenseParams, UpdateExpenseParams } from '../interfaces/expenseParams';
import { isValidDate } from './helpers/dateFunctions';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>) { }

  async create(createExpenseDto: ExpenseDto, { year, month }: ExpenseParams): Promise<Expense> {
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

  async getExpensesByYearAndMonth({ year, month }: ExpenseParams): Promise<Expense[]> {
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);

    return this.expenseModel.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });
  }

  async updateExpense(updateExpenseParams: UpdateExpenseParams, updateExpenseDto: UpdateExpenseDto) {
    const foundRecord = await this.expenseModel.findById(updateExpenseParams.id);
    
    if (!foundRecord) return null
    
    const currentExpenseYear = foundRecord.date.getFullYear();
    const currentExpenseMonth = foundRecord.date.getMonth() + 1; // Add + 1 because the return value will based on index 0

    // Subtract 1 from currentExpenseMonth to check if it is a valid date because the function is based on index 0
    // so march for example will actually be index 2 instead of 3.
    if (!isValidDate(updateExpenseDto.monthDay, currentExpenseMonth - 1, currentExpenseYear)) {
      return null;
    }

    const newUpdatedExpenseDate = new Date(`${currentExpenseYear}/${currentExpenseMonth}/${updateExpenseDto.monthDay}`);

    return this.expenseModel.findByIdAndUpdate(updateExpenseParams.id, { ...updateExpenseDto, date: newUpdatedExpenseDate }, { new: true });
  }

  async deleteExpense(id: string) {
    return this.expenseModel.findByIdAndDelete(id)
  }
}