import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transactions/transactions.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/dollarguard'), TransactionModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
