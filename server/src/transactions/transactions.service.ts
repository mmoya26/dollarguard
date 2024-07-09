import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from "./schemas/transaction.schema";

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const newTransactions = new this.transactionModel(createTransactionDto);
    return newTransactions.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}