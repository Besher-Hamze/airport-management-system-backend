import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true, unique: true })
  number: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  departureTime: string;

  @Prop({ required: true })
  arrivalTime: string;

  @Prop({ required: true })
  date: string;
  
  @Prop({ required: true })
  baggageAllowance: number;
  
  @Prop({ required: true })
  price: number;
  
  @Prop({ default: true })
  isActive: boolean;
  
  @Prop({ default: [] })
  occupiedSeats: string[];
  
  @Prop()
  gate: string;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);