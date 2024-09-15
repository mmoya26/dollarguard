import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocumenbt = HydratedDocument<User>;

@Schema({
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        },
    },
})
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({unique: true})
    lowerCaseEmail: string;

    @Prop({required: true}) 
    password: string;

    @Prop({required: true})
    creationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);