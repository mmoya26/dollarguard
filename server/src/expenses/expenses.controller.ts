import { Body, Controller, Get,Param, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { SearchForExpensesParams } from '../interfaces/searchForExpensesParams';

@Controller('expenses/:year/:month')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async getExpensesByYearAndMonth(@Param() params: SearchForExpensesParams) {
    return this.expensesService.getExpensesByYearAndMonth(params);
  }

  @Post()
  createExpense(@Param() params: SearchForExpensesParams, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto, params);
  }
}