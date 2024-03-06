import mongoose, { HydratedDocument } from "mongoose";
import { RoleInterface } from "../interfaces/role.interface";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role as RoleEnum } from "../enums/role.enum";
import { User, UserSchema } from "src/user/schemas/user.schema";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
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

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date
  })
  updatedAt: Date;
};

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.virtual("user", {
  ref: User.name,
  localField: "userId",
  foreignField: "id"
});

RoleSchema.index({ userId: 1, role: 1 }, { unique: true });