import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTPService } from 'src/otp/otp.service';
import { UsersService } from 'src/users/users.service';
import { Auth } from './schemas/auth.schema';
import mongoose, { Model } from 'mongoose';
import { GenerateAuthDTO, VerifyAuthDTO } from './dto/auth.dto';
import { User } from 'src/users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';

const anHour = 1000 * 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name, "auth")
    private readonly authModel: Model<Auth>,
    @Inject(OTPService)
    private readonly otpService: OTPService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}
                                                
  async generate(generateAuthDto: GenerateAuthDTO): Promise<string> {
    const otpId = await this.otpService.generate('register');
    const authInput = {
      cCode: generateAuthDto.cCode,
      phone: generateAuthDto.phone,
      otpId
    };
    
    const auth = new this.authModel(authInput);
    let generatedAuth = await auth.save();
    return generatedAuth.id;
  }

  async verify(verifyAuthDto: VerifyAuthDTO): Promise<{ access_token: string }> {
    let objectId = new mongoose.Types.ObjectId(verifyAuthDto.id);

    if (!mongoose.isValidObjectId(objectId)) {
      throw new BadRequestException("Please provide correct id.");
    }
    let auth = await this.authModel.findOne({ id: objectId });
    let validated = await this.otpService.validate(auth.otpId, verifyAuthDto.otp);

    if (!validated) {
      throw new UnauthorizedException("Incorrect OTP");
    }

    let user = await this.usersService.findOneByQuery({
      cCode: auth.cCode, phone: auth.phone
    });
    if (!user) {
      user = await this.usersService.create({
        cCode: auth.cCode, phone: auth.phone, phoneVerified: true
      });
    }
    const tokenPayload = { sub: user.id.toString(), expiry: Date.now() + anHour };
    console.log(tokenPayload);
    return { access_token: await this.jwtService.signAsync(tokenPayload) };
  }
}
