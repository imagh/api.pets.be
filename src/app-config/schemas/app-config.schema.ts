import mongoose, { HydratedDocument } from "mongoose";
import { AppConfig as AppConfigInterface } from "../interfaces/app-config.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AppConfigDocument = HydratedDocument<AppConfig>;

@Schema({ collection: 'config' })
export class AppConfig implements AppConfigInterface {
  @Prop({
    required: true,
    index: true,
    unique: true,
    type: mongoose.Schema.Types.String
  })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Mixed
  })
  conf: { [key: string]: any };
};

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);