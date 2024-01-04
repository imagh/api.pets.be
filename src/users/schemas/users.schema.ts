import mongoose, { HydratedDocument } from "mongoose";
import { User as UserInterface } from "../interfaces/users.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserInterface {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true
  })
  cCode: string;

  @Prop({
    required: true
  })
  phone: string;

  @Prop({
    unique: true,
    index: true
  })
  email: string;

  @Prop({
    index: true
  })
  firstName: string;

  @Prop({
    index: true
  })
  lastName: string;
};

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ cc: 1, phone: 1 }, { unique: true });
UserSchema.index({ cc: 1, phone: 1, email: 1 }, { unique: true });
UserSchema.index({ firstName: 1, lastName: 1 });