import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTP, OTPDocument } from './schemas/otp.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class OTPService {
  constructor(
    @InjectModel(OTP.name, "auth")
    private otpModel: Model<OTP>
  ) {}

	async generate(action: string, expiryIn?: number): Promise<string> {

		let otp = new this.otpModel({
			id: new mongoose.Types.ObjectId().toString(),
			otp: Math.floor(Math.random() * 900000 + 100000),
			action,
			expiryIn
		});

		let generatedOTP = await otp.save();
		console.log(generatedOTP.toString());
		return generatedOTP.id;
	}

	async validate(id: string, otpInput: string): Promise<Boolean> {
	//   let objectId = new mongoose.Types.ObjectId(id);
	let objectId = id;

    if (!mongoose.isValidObjectId(objectId)) {
      throw new BadRequestException("Please provide correct OTP id.");
    }

    let otp = await this.otpModel.findOne({ id: objectId }).exec();

    if (!otp) {
      throw new NotFoundException("OTP not found. Please regenerate OTP.");
    }
		if ((otp.createdAt.getTime() + otp.expiryIn) < Date.now()) {
			await otp.updateOne({ otp: "expiredAndFailed" }).exec();
			throw new BadRequestException("OTP expired. Please regenerate and try again.");
		}
		if (otp.otp !== otpInput) {
			throw new BadRequestException("Invalid OTP. Please try again.");
		}
		await otp.updateOne({ otp: "used" }).exec();
		return true;
	}
}
