
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '@interfaces/category';

export type ExpenseDocument = HydratedDocument<Expense>;

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
export class Expense {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: Object })
    category: Category;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: false })
    notes?: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
