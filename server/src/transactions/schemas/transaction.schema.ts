
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '@interfaces/category';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    @Prop({required: true})
    userId: string;

    @Prop({required: true, unique: true})
    transactionId: string;

    @Prop({type: Object})
    category: Category;

    @Prop({required: true})
    amount: string;

    @Prop({required: true})
    date: string;
    
    @Prop()
    note?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
