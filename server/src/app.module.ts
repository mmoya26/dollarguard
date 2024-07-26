import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expenses/expenses.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/dollarguard'), ExpenseModule],
})
export class AppModule {}
