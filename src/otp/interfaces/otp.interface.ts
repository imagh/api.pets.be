export interface OTP {
  id: string;
  otp: string;
  action: string;
  expiryIn: number;
  createdAt: Date;
  updatedAt: Date;
};