import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, OTPSchema } from './schemas/otp.schema';
import { OTPService } from './otp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }], "auth")
  ],
  providers: [OTPService],
  exports: [OTPService]
})
export class OTPModule {};
