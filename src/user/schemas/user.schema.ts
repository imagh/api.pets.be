import mongoose, { HydratedDocument } from "mongoose";
import { User as UserInterface } from "../interfaces/user.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements UserInterface {
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
    unique: true,
    index: true,
    sparse: true,
    type: mongoose.Schema.Types.String
  })
  email: string;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.String
  })
  firstName: string;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.String
  })
  lastName: string;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  phoneVerified: Boolean;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    default: false
  })
  emailVerified: Boolean;
};

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ cc: 1, phone: 1 }, { unique: true });
UserSchema.index({ cc: 1, phone: 1, email: 1 }, { unique: true });
UserSchema.index({ firstName: 1, lastName: 1 });