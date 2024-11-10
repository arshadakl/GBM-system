import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroundDocument = Ground & Document;

@Schema({ timestamps: true })
export class Ground {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [String], default: [] })
  capabilities: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ default: false })
  hasLighting: boolean;
}

export const GroundSchema = SchemaFactory.createForClass(Ground);
