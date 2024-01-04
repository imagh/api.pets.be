import mongoose from "mongoose";

export interface User {
  id: mongoose.Schema.Types.ObjectId;
  cCode: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};