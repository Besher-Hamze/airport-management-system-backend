import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    _id: any;
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'user' })
    role: string;

    @Prop({ default: [] })
    favoriteAirports: string[];

    @Prop({ default: [] })
    recentSearches: {
        from: string;
        to: string;
        date: string;
        timestamp: Date;
    }[];
}

export const UserSchema = SchemaFactory.createForClass(User);