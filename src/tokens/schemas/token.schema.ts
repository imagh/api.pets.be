import mongoose, { HydratedDocument } from "mongoose";
import { Token as TokenInterface } from "../interfaces/token.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token implements TokenInterface {
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
};

export const TokenSchema = SchemaFactory.createForClass(Token);
// mongoose.model(Auth.name, AuthSchema, 'auth');