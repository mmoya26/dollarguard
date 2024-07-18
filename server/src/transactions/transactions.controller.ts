import { Body, Controller, Get,Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchForTransactionParams } from '../interfaces/searchForTransactionParams';

@Controller('transactions/:year/:month')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransactionsByYearAndMonth(@Param() params: SearchForTransactionParams) {
    return this.transactionsService.getTransactionsByYearAndMonth(params);
  }

  @Post()
  createTransaction(@Param() params: SearchForTransactionParams, @Body() createUserDto: CreateTransactionDto) {
    return this.transactionsService.create(createUserDto, params);
  }
}