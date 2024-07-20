import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from "./schemas/transaction.schema";
import { SearchForTransactionParams } from '../interfaces/searchForTransactionParams';
import { isValidDate, isValidMonth } from './helpers/dateFunctions';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>) {}

  async create(createTransactionDto: CreateTransactionDto, {year, month}: SearchForTransactionParams): Promise<Transaction> {
    if (!isValidDate(createTransactionDto.monthDay, Number(month) - 1, year)) throw new HttpException('Transaction could not be added', 400);

    const newTransaction = new this.transactionModel(createTransactionDto);
    newTransaction.date = new Date(`${month}/${createTransactionDto.monthDay}/${year}`);

    return newTransaction.save();
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionModel.find();
  }

  async getTransactionById(id: string): Promise<Transaction> {
    return this.transactionModel.findById(id);
  }

  async getTransactionsByYearAndMonth({year, month} : SearchForTransactionParams): Promise<Transaction[]> {
    if (!isValidMonth(month)) throw new HttpException('Unable to get transactions', 400);

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);

    return this.transactionModel.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    })
  }
}