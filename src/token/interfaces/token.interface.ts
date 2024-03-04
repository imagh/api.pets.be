import mongoose from "mongoose";

export interface Token {
  id: mongoose.Schema.Types.ObjectId;
  authId: string;
  userId: string;
  access_token: string;
  refresh_token: string;
};