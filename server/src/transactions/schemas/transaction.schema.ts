
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '@interfaces/category';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
})
export class Transaction {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: Object })
    category: Category;

    @Prop({ required: true })
    amount: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: false })
    note?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
