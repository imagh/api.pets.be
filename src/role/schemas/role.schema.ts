import mongoose, { HydratedDocument } from "mongoose";
import { RoleInterface } from "../interfaces/role.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role as RoleEnum } from "../enums/role.enum";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role implements RoleInterface {
  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.String
  })
  userId: string;

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.String
  })
  role: RoleEnum;
};

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index({ userId: 1, role: 1 }, { unique: true });