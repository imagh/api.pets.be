import mongoose from "mongoose";

export interface OTP {
  id: mongoose.Schema.Types.ObjectId;
  otp: string;
  action: string;
  generatedAt: number;
  expiryIn: number;
};