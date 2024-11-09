// import { Schema, Document } from 'mongoose';

// export interface Admin extends Document {
//   username: string;
//   email: string;
//   password: string;
//   role: string;
// }

// export const AdminSchema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, default: 'admin' },
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'admin' }) // Default role for admin
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
