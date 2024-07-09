import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './schemas/transaction.schema';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {

    return [{
      userId: "ui1",
      transactionId: "2",
      amount: "50",
      date: "5/27/2024",
      category: {
        name: 'Phone Bill',
        hexColor: '#4F46E5'
      },
      note: "Test Notes"
    }]
    // return this.transactionsService.findAll();
  }

  @Post()
  createTransaction(@Body() createUserDto: CreateTransactionDto) {
    this.transactionsService.create(createUserDto);
  }
}