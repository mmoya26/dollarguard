import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Transaction } from '@interfaces/transaction';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Transaction[] {
    let transactions = [
      {
        userId: "ui1",
        transactionId: "1",
        amount: "100",
        date: "5/27/2024",
        category: {
          name: 'Gas',
          hexColor: '#DC2626'
        },
        note: "Test Notes"
      },
      {
        userId: "ui1",
        transactionId: "2",
        amount: "50",
        date: "5/27/2024",
        category: {
          name: 'Phone Bill',
          hexColor: '#4F46E5'
        },
        note: "Test Notes"
      },
    ];

    return transactions;
  }
}
