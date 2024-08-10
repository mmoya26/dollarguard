import { Body, Controller, Get, Param, Post, Delete, HttpException, Patch, HttpStatus } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { ExpenseParams, UpdateExpenseParams } from '../interfaces/expenseParams';
import mongoose from 'mongoose';
import { isValidDate, isValidMonth } from './helpers/dateFunctions';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async getUserYears() {
    return await this.expensesService.getYears()
  }

  @Get(':year/:month')
  async getExpensesByYearAndMonth(@Param() params: ExpenseParams) {
    if (!isValidMonth(params.month)) throw new HttpException('Unable to get expenses', HttpStatus.BAD_REQUEST);
    return this.expensesService.getExpensesByYearAndMonth(params);
  }

  @Post(':year/:month')
  async createExpense(@Param() params: ExpenseParams, @Body() createExpenseDto: ExpenseDto) {
    if (!isValidDate(createExpenseDto.monthDay, Number(params.month) - 1, params.year)) throw new HttpException('Expense could not be added', HttpStatus.BAD_REQUEST);

    return this.expensesService.create(createExpenseDto, params);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    const deletedExpense = await this.expensesService.deleteExpense(id) 
    if (!deletedExpense) throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async updateExpense(@Param() updateExpenseParams: UpdateExpenseParams, @Body() updateExpenseDto: UpdateExpenseDto) {
    const isValidId = mongoose.Types.ObjectId.isValid(updateExpenseParams.id);
    if (!isValidId) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);

    const updatedExpense =  await this.expensesService.updateExpense(updateExpenseParams, updateExpenseDto);
    if (!updatedExpense) throw new HttpException('Unable to update expense', HttpStatus.BAD_REQUEST);

    return updatedExpense;
  }
}