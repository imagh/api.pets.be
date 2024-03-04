import mongoose from "mongoose";

export interface Auth {
  id: mongoose.Schema.Types.ObjectId;
  cCode: string;
  phone: string;
  otpId: string;
  access_token: string;
  refresh_token: string;
  authenticated: Boolean;
};