import mongoose, { HydratedDocument } from "mongoose";
import { Auth as AuthInterface } from "../interfaces/auth.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OTP } from "src/otp/schemas/otp.schema";

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth implements AuthInterface {
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
  cCode: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  phone: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  otpId: string;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  authenticated: Boolean;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  updatedAt: Date;
};

export const AuthSchema = SchemaFactory.createForClass(Auth);
// mongoose.model(Auth.name, AuthSchema, 'auth');

AuthSchema.virtual("otp", {
  ref: OTP.name,
  localField: "otpId",
  foreignField: "id"
});