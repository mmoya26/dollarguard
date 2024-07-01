
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '@interfaces/category';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    @Prop({required: true})
    userId: string;

    @Prop()
    transactionId: string;

    @Prop({type: Object})
    category: Category;

    @Prop()
    amount: string;

    @Prop()
    date: string;

    @Prop()
    note?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
