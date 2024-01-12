import mongoose, { HydratedDocument } from "mongoose";
import { OTP as OTPInterface } from "../interfaces/otp.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OTPDocument = HydratedDocument<OTP>;

@Schema()
export class OTP implements OTPInterface {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  })
  id: mongoose.Schema.Types.ObjectId;

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
    type: mongoose.Schema.Types.Number
  })
  generatedAt: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Number,
    default: 600000
  })
  expiryIn: number;
};

export const OTPSchema = SchemaFactory.createForClass(OTP);