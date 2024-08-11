import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/dollarguard'), ExpenseModule, AuthModule],
})
export class AppModule {}
