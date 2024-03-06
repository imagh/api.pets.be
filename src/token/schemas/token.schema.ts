import mongoose, { HydratedDocument } from "mongoose";
import { Token as TokenInterface } from "../interfaces/token.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/schemas/user.schema";
import { Auth } from "src/auth/schemas/auth.schema";

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token implements TokenInterface {
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
  authId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String
  })
  userId: string;

  @Prop({
    unique: true,
    type: mongoose.Schema.Types.String
  })
  access_token: string;

  @Prop({
    unique: true,
    type: mongoose.Schema.Types.String
  })
  refresh_token: string;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  updatedAt: Date;
};

export const TokenSchema = SchemaFactory.createForClass(Token);
// mongoose.model(Auth.name, AuthSchema, 'auth');

TokenSchema.virtual("user", {
  ref: User.name,
  localField: "userId",
  foreignField: "id"
});

TokenSchema.virtual("auth", {
  ref: Auth.name,
  localField: "authId",
  foreignField: "id"
});