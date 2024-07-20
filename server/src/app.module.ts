import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './expenses/expenses.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/dollarguard'), TransactionModule],
})
export class AppModule {}
