import mongoose, { HydratedDocument } from "mongoose";
import { Auth as AuthInterface } from "../interfaces/auth.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth implements AuthInterface {
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
};

export const AuthSchema = SchemaFactory.createForClass(Auth);
// mongoose.model(Auth.name, AuthSchema, 'auth');