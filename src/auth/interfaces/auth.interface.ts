export interface Auth {
  id: string;
  cCode: string;
  phone: string;
  otpId: string;
  authenticated: Boolean;
  createdAt: Date;
  updatedAt: Date;
};