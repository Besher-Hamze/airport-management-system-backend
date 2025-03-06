import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Flight } from './flight.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  bookingNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true })
  flight: Flight;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  passport: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  nationality: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  seat: string;
  
  @Prop({ default: 'confirmed' })
  status: string;
  
  @Prop()
  passportFile: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);