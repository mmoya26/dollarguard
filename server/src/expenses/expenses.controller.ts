import { Body, Controller, Get, Param, Post, Delete, HttpException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseParams } from '../interfaces/expenseParams';
import mongoose from 'mongoose';
import { isValidDate, isValidMonth } from './helpers/dateFunctions';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get(':year/:month')
  async getExpensesByYearAndMonth(@Param() params: ExpenseParams) {
    if (!isValidMonth(params.month)) throw new HttpException('Unable to get expenses', 400);
    return this.expensesService.getExpensesByYearAndMonth(params);
  }

  @Post(':year/:month')
  createExpense(@Param() params: ExpenseParams, @Body() createExpenseDto: CreateExpenseDto) {
    if (!isValidDate(createExpenseDto.monthDay, Number(params.month) - 1, params.year)) throw new HttpException('Expense could not be added', 400);

    return this.expensesService.create(createExpenseDto, params);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid ID', 400);

    const deletedExpense = await this.expensesService.deleteExpense(id) 
    if (!deletedExpense) throw new HttpException('Expense not found', 404);
  }
}