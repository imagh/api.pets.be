import mongoose, { HydratedDocument } from "mongoose";
import { OTP as OTPInterface } from "../interfaces/otp.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OTPDocument = HydratedDocument<OTP>;

@Schema({ timestamps: true })
export class OTP implements OTPInterface {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: mongoose.Schema.Types.String
  })
  id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  otp: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  action: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Number,
    default: 600000
  })
  expiryIn: number;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  updatedAt: Date;
};

export const OTPSchema = SchemaFactory.createForClass(OTP);