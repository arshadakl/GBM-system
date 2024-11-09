import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroundDocument = Ground & Document;

@Schema({ timestamps: true })
export class Ground {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  type: string; // e.g., 'football', 'cricket'

  @Prop({ type: [String], default: [] })
  capabilities: string[]; // e.g., ['5s', '6s', '7s', '11s']

  @Prop({ required: true })
  price: number;

  @Prop({ default: false })
  hasLighting: boolean; // True if lighting is available
}

export const GroundSchema = SchemaFactory.createForClass(Ground);
