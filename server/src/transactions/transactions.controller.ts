import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import mongoose from 'mongoose';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionsService.getTransactions();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new HttpException('Transaction was not found', 404);

    const foundTransaction = await this.transactionsService.getTransactionById(id);

    if (!foundTransaction) throw new HttpException('Transaction was not found', 404);

    return foundTransaction;
  }

  @Post()
  createTransaction(@Body() createUserDto: CreateTransactionDto) {
    return this.transactionsService.create(createUserDto);
  }
}